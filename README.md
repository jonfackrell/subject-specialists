# Subject Specialists Demo

The purpose of this project was to create a webpage with a list of subject specialist librarians. 

- [x] List librarian's picture, name, and subject specialties (each librarian is displayed once)
- [x] Librarians can be sorted alphabetically and reverse alphabetically by first and last name
- [x] Effort was made to make page accessible 
- [x] Page is responsive 

My initial goal was to create a standalone script that could be reused; however, due to time constraints there is still quite a bit of work to make this a reality.

The subject specialist page was created using vanilla javascript in conjuction with [Tailwind CSS](https://tailwindcss.com/), [Axios](https://www.npmjs.com/package/axios), [Underscore](https://underscorejs.org/), and [Handlebars](https://handlebarsjs.com/).

## Usage

```javascript
<script type="text/javascript">
    var ss = ss || {};
    var dc = document.createElement('script');
    dc.type = 'text/javascript'; dc.async = true;
    dc.src = 'build/js/subject-specialists.min.js';
    document.getElementsByTagName("body")[0].appendChild(dc);
</script>
```

## License
[MIT](https://choosealicense.com/licenses/mit/)