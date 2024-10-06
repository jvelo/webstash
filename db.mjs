import postgres from 'postgres'

const {
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE,
} = process.env;

const sql = postgres("postgres://postgres:@localhost:5432/postgres", {
    host: POSTGRES_HOST,
    database: POSTGRES_DATABASE,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

await sql`
    create schema if not exists webstash;

    create table if not exists webstash.link_preview (
        uri text not null,
        generated_at timestamp not null default current_timestamp,
        title text,
        description text,
        image_url text,
        site_name text,
        og_type text,
        locale text,
        published_at timestamp,
        author text,
        metadata jsonb,
        primary key (uri, generated_at)
    );

    create or replace view webstash.link_preview_latest as
    select distinct on (uri) *
    from link_preview
    order by uri, generated_at desc;    
`.simple();

export default sql;
