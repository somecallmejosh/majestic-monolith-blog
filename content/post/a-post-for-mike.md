+++
tags = [
  "Audio",
  "Backend",
  "Business",
  "CSS",
  "Code Example",
  "Front End",
  "Golang",
  "HTML",
  "Javascript",
  "Rails",
  "Ruby",
  "Video",
  "Sass"
]
categories = [
  "Problem Solving",
  "Debugging",
  "Opinion"
]
author = "mtp"
title = "A Post For Mike"
date = "2016-10-30T14:14:02-04:00"

+++

In an effort to keep things organized, I've laid out this post for your stank ass.

# Front Matter Considerations

When filling in the `author` attribute, use your initials `mtp`. My initials are `jkb`. This will ensure we are clearly attributed at the bottom of each post we write. Right now, this is clunky at best. I'm just using a static partial. If we want this to scale at some point, we'll want to convert this to some sort of JSON object for each author.

## Our Main categories will be:

- Before and After
- Debugging
- Problem Solving
- Guide or How To
- Opinion

## Our Main tags will be:

- Audio
- Backend
- Business
- CSS
- Code Example
- Front End
- Golang
- HTML
- Javascript
- Rails
- Ruby
- Video
- Sass

Obviously we can add more to the categories and tags as needed. This is just a starting point. In the footer, you can see that each tag and category has it's own landing page you can link to.

## Here's how to add a quote that can be shared on Twitter

**Right now, we should limit this to one pullquote per post.** My js is looking for the first `<blockquote>` on the page. I could refactor to loop through all blockquotes, but one seems sufficient.

{{< twitterShareQuote "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." >}}

## Here's How to add a Gist

For code samples, we agreed that gists would be a reasonable solution for now.

{{< gist somecallmejosh a0d9b419a8989213b783 >}}

## Here's how to embed a Tweet

{{< tweet 666616452582129664 >}}

## Here's how to add a Youtube Video

This has responsive goodness already baked in, so no need to worry about adding any sort of 'is-responsive' classes.

{{< youtube w7Ft2ymGmfc >}}

## Like What You Just Read?

The following stuff is auto generated from the `single.html` file. The **similar posts** section is based on **front matter category** but could be expanded to include posts with similar **front matter tags** if we want.

Also, I will add SVG's to the newsletter and twitter links at some point in the near future.


## Joining the discussion (Below the 'Like what you just read?' section)

This is a partial that is included in every post. It's part of the `single.html` file, too. Nothing really special going on, other than the fact that you will not see this in your local dev environment. The nice folks at Hugo recommend keeping the discussion out of local for the following reason:

<em>Don't ever inject Disqus on localhost--it creates unwanted discussions from 'localhost:1313' on your Disqus account</em>
