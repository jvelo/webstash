import _metascraper from 'metascraper';
import title from 'metascraper-title';
import image from 'metascraper-image';
import description from 'metascraper-description';
import url from 'metascraper-url';
import author from 'metascraper-author';
import publisher from 'metascraper-publisher';
import date from 'metascraper-date';

export const metascraper = _metascraper([
    title,
    image,
    description,
    url,
    author,
    publisher,
    date
]);
