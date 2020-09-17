window.ss = {

    template: null,

    container: null,

    people: [],

    init: function(){

        ss.setTemplate();

        axios.get('subject-specialists.json')
            .then(function (response) {
                ss.container = document.getElementById('subject-specialists');
                ss.data = response.data;
                ss.people = ss.aggregateSubjects(ss.data);
                ss.people = ss.sortBy(ss.people, 'first_name', 'az');
                ss.updateDisplay();
            })
            .catch(function (error) {
                alert(error);
            })
            .then(function () {
                ss.registerEvents();
            });

    },

    registerEvents: function () {
        var search = document.getElementById('search_field');
        search.addEventListener("keyup", ss.search);
        search.addEventListener("search", ss.search);

        var sort = document.getElementById('sort');
        sort.addEventListener("change", function(){
            var [property, order] = event.target.value.split(":")
            ss.people = ss.sortBy(ss.people, property, order);
            ss.updateDisplay();
        });
    },

    updateDisplay: function (){
        ss.container.innerHTML = '';
        ss.people.forEach(function (person){
            ss.container.insertAdjacentHTML('beforeend', ss.template(person));
        });
    },

    setTemplate: function (){
        Handlebars.registerHelper('url', function () {
            if(this.last_name == 'Kaur'){
                this.full_name = 'Aman Kaur';
            }
            return 'https://www.library.upenn.edu/people/staff/' + this.full_name.split(' ').join('-');
        });
        Handlebars.registerHelper('subjects', function () {
            return this.subject_specialties.join(', ');
        });

        ss.template = Handlebars.compile(
      '   <li class="subject-specialist" data-name="{{ full_name }}" data-subject="{{ job_title }}">\n' +
            '        <article class="space-y-4">\n' +
            '            <div class="relative pb-2/3">\n' +
            '                <img class="absolute object-cover h-full w-full shadow-lg rounded-lg" src="https://www.library.upenn.edu/{{ thumbnail }}" alt="Profile picture of {{ full_name }}">\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="space-y-2">\n' +
            '                <div class="text-lg text-gray-900 leading-6 font-medium space-y-1">\n' +
            '                    <h4><a href="{{ url }}">{{ full_name }}</a></h4>\n' +
            '                    <p class="text-gray-600">{{{ subjects }}}</p>\n' +
            '                </div>\n' +
            '            <div class="text-lg leading-7">\n' +
            '                <p class="text-gray-500">{{{ office }}}</p>\n' +
            '            </div>' +
            '            <div class="mt-5 max-w-md flex justify-between md:mt-8">\n' +
            '               {{#if email}}<a href="mailto:{{ email }}" class="text-blue-900 hover:text-gray-500 transition ease-in-out duration-150 pr-4">\n' +
            '                   {{ email }}\n' +
            '               </a>\n{{/if}}' +
            '               {{#if phone}}<a href="tel:{{ phone }}" class="text-blue-900 hover:text-gray-500 transition ease-in-out duration-150">\n' +
            '                   {{ phone }}\n' +
            '               </a>\n{{/if}}' +
            '               </div>\n' +
            '            </div>\n' +
            '        </article>\n' +
            '    </li>');
    },

    aggregateSubjects: function(people){
        var groupedPeople = {};
        people.forEach(function (person) {
            if(groupedPeople[person.user_id] === undefined){
                person.subject_specialties = [person.subject_specialty];
                groupedPeople[person.user_id] = person;
            }else{
                groupedPeople[person.user_id].subject_specialties.push(person.subject_specialty);
            }
        });
        return Object.values(groupedPeople);
    },

    sortBy: function(people, property, direction = 'az'){
        people = _.sortBy(people, property);
        if(direction == 'za'){
            people = people.reverse();
        }
        return people;
    },

    search: function(event){
        if (event.isComposing || event.keyCode === 229) {
            return;
        }
        var peopleContainers = Array.prototype.slice.call(document.getElementsByClassName('subject-specialist'));
        peopleContainers.forEach(function(person){
            if(ss.compare(person, ['name', 'subject'], event.target.value)){
                person.style.display = "block";
            }else{
                person.style.display = "none";
            }
        });
    },

    compare: function (person, properties, value) {
        var contains_match = false;
        properties.forEach(function (property) {
            if(person.dataset[property].toUpperCase().indexOf(value.toUpperCase()) >= 0){
                contains_match = true;
            }
        });
        return contains_match;
    }
};

ss.init();