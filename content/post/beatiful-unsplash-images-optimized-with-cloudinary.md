+++
snippet = "Use Cloudinary to manage and optimize those beautiful images from Unsplash.com."
title = "Beautiful Unsplash.com Images Optimized with Cloudinary"
tags = [
  "Images"
]
categories = [
  "Guide"
]
authors = "Joshua Briley"
cloudinary = "v1479150710/image-optimization.jpg"
date = "2016-11-14T13:52:11-05:00"

+++

## Royalty Free Doesn't Always Mean Great

The internet is full of wonderful people sharing knowledge and resources. Creatives and developers alike figure out new challenges and share their findings. We can see this in action on Github, Dribbble, Behance, Twitter and other social sites on the web. This sharing makes our industry unique and wonderful.

One thing that is hard to find is beautiful and usable photography. Royalty Free images are all over the web. You can poke around [Flickr](http://www.flickr.com). You can look through [Google Images](https://images.google.com). [Getty](http://www.gettyimages.com/) has some really nice stuff, too. You *may get lucky* and find photographs that are free to use. You *may be able* to use them without restriction, or attribution. And, you *may be able to use them for commercial products or services*. Or, maybe not. No guarantees. Royalty free doesn't always mean great, or even good. Welcome to Unsplash.com!

## Unsplash.com Offers Beautiful Free Images

Unsplash.com shares **[photos you can use online or in print](https://unsplash.com/)**. Their pictures fall under the Creative Commons Zero license. This means you can do anything you like with the pictures you use. There are no commercial restrictions. You can slice them. You can dice them. Unsplash.com won't even get mad if you layer a Photoshop 7.0 lens flare filter on one of their pics. The sky is the limit.

**But, are they nice pictures?** I think the title of this article answers that question. Allow me to continue on that thought. In my opinion, the pictures available on Unsplash.com are brilliant, professional photographs. They are interesting and thought provoking. They are a departure from the typical stock photo look and feel. I haven't come across any contrived images of two business people shaking hands. I haven't found an excited and well groomed customer service representative. The pictures feel more like real life. Or, at least a life we'd like to imagine as being real. Since they are all hi-resolution images you can use them on your website and printed materials. In the [Cloudinary section below](#optimized-unsplash-com-image-examples), I will demonstrate some Unsplash.com images. You can be the judge.

Using their images is easy. You can go to their website and search for a particular keyword. This yielded better than expected results for my searches. They offer a series of user created collections that may prove useful. Mileage may vary, depending on your topic. They also offer [Javascript and PHP API's](https://unsplash.com/developers) for those who want to geek out.


## Web Image Management for Developers

[Cloudinary](http://www.cloudinary.com) removes the headache of creating and managing responsive images on the web. I learned about them a few months back, working on a project at work. It changed my life. Our web edit team was also appreciative of this service. Cloudinary was the single solution that was a win for both teams.

We are also managing images on Majestic Monolith with Cloudinary. It deals with every image need we have. No need to save image variations for 1x, 1.5x, 2x and more. No more forgetting to add [picture polyfills](https://github.com/scottjehl/picturefill) for some older browsers. No need to save cropped versions for smaller view ports. We've outsourced all these tasks to Cloudinary. Make sure to check out [their plans](http://cloudinary.com/pricing) to see if they offer a solution that meets your needs. Their free plan is serving at needs well (at the time of this writing). For us, it's a total win. They handle image optimization so we can research and write content.

### Cloudinary Javascript Dependencies

The [minified Cloudinary.js file](https://github.com/somecallmejosh/majestic-monolith-blog/blob/master/static/js/cloudinary.js) is 45KB. You'll also need either [jQuery](http://jquery.com/) or [Lodash](https://lodash.com/) running in your project. In a perfect world we would deem Cloudinary to be a monolith. It almost doesn't make our cut. It sure does a lot of heavy lifting for us, though. We are also still able to get fast page load speeds by deferring Cloudinary and its dependencies. We've decided the trade off is worth the extra dependencies.

{{< highlight html >}}
<script src="/js/main.min.js" defer></script>
<script src="/js/cloudinary.js" defer></script>
{{< /highlight >}}

## Image Optimization on the Fly

This is an example of how easy it is to optimize images with Cloudinary:

{{< highlight html >}}
<div>
<img
  data-src='https://res.cloudinary.com/your-account-id/image/upload/c_fill,g_face,dpr_auto,q_auto,w_auto/path-to-my-image-on-cloudinary'
  alt="An image of sorts"
  class="cld-responsive"
>
</div>
{{< /highlight >}}

All the magic happens in the string `c_fill,g_face,dpr_auto,q_auto,w_auto` from the code snippet above. The Cloudinary.js script looks uses data attribute string to work its magic. A fallback `src` attribute can also be used in the case where Javascript is not available.

- **c_fill**: fills the parent container.
- **g_face**: if there is a face in the image, make sure it is in focus.
- **dpr_auto**: if I'm on a 2x monitor, use a 2x image. If I'm on a 1x, serve a 1x.
- **q_auto**: serve up the appropriate amount of image compression.
- **w_auto**: do not place any width limitations on the image.

The above only scratches the surface. I invite you to explore all the [amazing things you can do with Cloudinary](http://cloudinary.com/documentation/image_transformations).

## Optimized Unsplash.com Image Examples

Here are some examples of images and the associated `<img>` element construction for your Cloudinary images.

### Business Casual Web Image Example:

{{< cloudinaryResponsiveImage "v1479161837/unsplash-example.jpg" >}}

{{< highlight html >}}
<div class="image">
  <img data-src="https://res.cloudinary.com/dwjulenau/image/upload/c_fill,dpr_auto,q_auto,w_auto/v1479161837/unsplash-example.jpg" src="https://res.cloudinary.com/dwjulenau/image/upload/c_fill,dpr_2.0,q_auto,w_400/v1479161837/unsplash-example.jpg" alt="An image of sorts" class="cld-responsive responsive-img">
</div>
{{< /highlight >}}

### Artsy Web Image Example

{{< cloudinaryResponsiveImage "v1479162150/colorful.jpg" >}}

{{< highlight html >}}
<div class="image">
  <img data-src="https://res.cloudinary.com/dwjulenau/image/upload/c_fill,dpr_auto,q_auto,w_auto/v1479162150/colorful.jpg" src="https://res.cloudinary.com/dwjulenau/image/upload/c_fill,dpr_2.0,q_auto,w_400/v1479162150/colorful.jpg" alt="An image of sorts" class="cld-responsive responsive-img">
</div>
{{< /highlight >}}

### Nature Oriented Web Image Example

{{< cloudinaryResponsiveImage "v1479162320/yosemite.jpg" >}}

{{< highlight html >}}
<div class="image">
  <img data-src="https://res.cloudinary.com/dwjulenau/image/upload/c_fill,dpr_auto,q_auto,w_auto/v1479162320/yosemite.jpg" src="https://res.cloudinary.com/dwjulenau/image/upload/c_fill,dpr_2.0,q_auto,w_400/v1479162320/yosemite.jpg" alt="An image of sorts" class="cld-responsive responsive-img">
</div>
{{< /highlight >}}

## In Closing
**Thank you, Unsplash.com**. Almost every image on this site is a representation of your offering. Dear reader, I encourage you to head over to [their website](https://unsplash.com/) and poke around. There are no signups required. No trickery. No tomfoolery. Nothing to lose.

**Thank you, Cloudinary**. You've made the process of image optimization and management a breeze. I also encourage our readers to check out [Cloudinary](http://www.cloudinary.com) for more info.

And, **thank you** for taking the time to read our very first blog post. If you have other image optimization solutions you use, please share your thoughts below. Also, be sure to tell your friends if you like what you see here.
