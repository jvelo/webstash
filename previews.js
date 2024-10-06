
import { NewLinkPreview} from './types';

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

    try {
        const result = await sql`
          insert into link_preview (
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
            ${title},
            ${description},
            ${image_url},
            ${site_name},
            ${og_type},
            ${locale},
            ${published_at},
            ${author},
            ${metadata ? sql.json(metadata) : null}
          )
          returning *;
        `;
    }
}