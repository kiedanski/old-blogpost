function build_post(page) {

    var header = "---\nlayout: post\n"

    const pageTitle = page["properties"]["Name"]["title"][0]["text"]["content"];
    const createdTime = new Date(page["created_time"]).toISOString().slice(0, 10);
    const tags = page["properties"]["Tags"]["multi_select"].map(x => x["name"]);

    header = header + "title: " + pageTitle + "\n";
    header = header + "date: " + createdTime + "\n";
    header = header + "author: " + process.env.AUTHOR + "\n";

    if (tags.length > 0) {
        header = header + "categories: " + tags.join() + "\n";
    }

    if (!page["cover"] === null) {
        const coverPath = page["cover"]["external"]["url"]
        header = header + "cover-image: " + coverPath + "\n";
    }


    var filename = process.env.GITHUB_WORKSPACE + "/";

    console.log(pageTitle);
    if (pageTitle.toLowerCase() === "about") {
        filename = filename + "about.md";
        header = header + "layout: page\n";
    } else if (pageTitle.toLowerCase() == "index") {
        filename = filename + "index.md";
        header = header + "layout: home\n";
    }
    else {
        filename = filename + "_posts/" + createdTime + "-" + pageTitle.replaceAll(" ", "-") + ".md";
        header = header + "layout: post\n";
    }

    header = header + "---\n\n";


    return [filename, header];
}

module.exports = { build_post };