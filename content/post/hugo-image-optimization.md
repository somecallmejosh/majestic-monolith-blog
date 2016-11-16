+++
cloudinary = "v1479150710/image-optimization.jpg"
date = "2016-11-14T13:17:47-05:00"
draft = true
snippet = "Want to make those images on your Hugo site extra lean? Here's one way how!"
title = "Hugo Image Optimization"
tags = [
  "Front End",
  "HTML",
  "CSS",
  "Javascript"
]
categories = [
  "How To"
]
authors = "Joshua Briley"

+++

## What is Image Optimization?
- A process of making an image the smallest file size without pixelization
- Define image compression algorithms, in general detail

## What are the benefits of image optimization?
- Faster loading websites
- Clear images

## What are the drawbacks of image optimization?
- Overoptimization can lead to grainy looking images
- It requires time and planning
  - If batch processing tools aren't available, it can take a lot of time to manually cut and optimize each image

## What kinds of images should I optimize?
- Vector images
- Raster images

## What types of optimization compression should I use?

Are there tools to help with optimization?
- Photoshop
- ImageOptim for Mac
- CSS options
- Terminal/Command line tools
- Gulp tools
- Online services Cloudinary

# Cloudinary

## What is Cloudinary?

## What are the benefits of Cloudinary?
- Baseline package is free to use.
- Free, live webinar training is available.
- Very easy for non technical people to manage images.
- It takes care of all the responsive features you may need.
- It serves the appropriate image type, based on the browsers (WebP, JPG, PNG)
- Is serves the appropriate resolution (1x, 2x, etc.) based on the device pixel density.
- Images can be edited, on the fly, right in the URL.
  - resized (specifica aspect ratios)
  - filters (yeh, like sepia and stuff)
  - rounded edges
  - transforms
  - tons more...

## What are the drawbacks of Cloudinary?
- Pretty heavy javascript dependency
  - Additional dependencies on either jQuery or lodash
  - scripts can be deferred, though.
- The documentation is almost too thorough.

## How do I use Cloudinary with Hugo?

{{< highlight html >}}
<section id="main">
  <div>
    <h1 id="title">{{ .Title }}</h1>
    {{ range .Data.Pages }}
      {{ .Render "summary"}}
    {{ end }}
  </div>
</section>
{{< /highlight >}}



- Demo project setup
- Demo basic href construction
- Demo responsive requirements
- Demo front matter inclusion
- Demo shortcode for inclusion into posts
