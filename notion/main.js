const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');
const fs = require('fs');
const lib = require("./utils");


require('dotenv').config();

// or
// import {NotionToMarkdown} from "notion-to-md";

const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

// passing notion client to the option
const n2m = new NotionToMarkdown({ notionClient: notion });

const page2md = async (pageId) => {

    const actualPage = await getPage(pageId);
    // console.log(actualPage)
    const mdblocks = await n2m.pageToMarkdown(pageId);
    var mdString = n2m.toMarkdownString(mdblocks);

    [filename, header] = lib.build_post(actualPage);

    mdString = header + mdString;

    mdString = lib.postProcessMarkdown(mdString);

    //writing to file
    fs.writeFile(filename, mdString, (err) => {
        // console.log(err);
    });
}

const getPage = async (pageId) => {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
};

const main = async () => {

    const get_blogposts = async () => {
        const blogposts = await notion.databases.query({
            database_id: process.env.DATABASE_ID,
            filter: {
                property: 'Ready',
                checkbox: {
                    equals: true
                }
            }
        });
        return blogposts;
    };

    const blogposts = await get_blogposts();
    const pages = blogposts["results"]
    for (var i = 0; i < pages.length; i++) {
        pageId = pages[i]["id"];
        page2md(pageId);
    }
};

main();
