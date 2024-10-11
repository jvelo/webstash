// @ts-check

/**
 * @typedef {import('./types').NewLinkPreview} NewLinkPreview
 */

import {metascraper} from './metascraper.js';
import sql from './db.mjs';

/**
 * @param {string} url
 */
export async function preview(url) {
    const response = await fetch(url);
    const html = await response.text();

    // Extract metadata using metascraper
    const metadata = await metascraper({html, url});
    console.log('metadata', metadata);

    const linkPreview = {
        uri: url,
        title: metadata.title,
        description: metadata.description,
        image_url: metadata.image,
        site_name: metadata.publisher,
        published_at: metadata.date ? new Date(metadata.date) : undefined,
        author: metadata.author,
        metadata
    };

    return insertLinkPreview(linkPreview);
}


/**
 * @param {NewLinkPreview} linkPreview
 */
export async function insertLinkPreview(linkPreview) {
    const {
        uri,
        title,
        description,
        image_url,
        site_name,
        og_type,
        locale,
        published_at,
        author,
        metadata,
    } = linkPreview;

    const result = await sql`
    insert into webstash.link_preview (
      uri,
      title,
      description,
      image_url,
      site_name,
      og_type,
      locale,
      published_at,
      author,
      metadata
    ) values (
      ${uri},
      ${title || null},
      ${description || null},
      ${image_url || null},
      ${site_name || null},
      ${og_type || null},
      ${locale || null},
      ${published_at || null},
      ${author || null},
      ${metadata ? sql.json(metadata) : null}
    )
    returning *;
  `;
}
