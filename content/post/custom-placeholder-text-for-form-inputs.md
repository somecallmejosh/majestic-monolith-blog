+++
authors = "Joshua Briley"
cloudinary = "v1479502856/custom-typography.jpg"
date = "2016-11-18T15:57:14-05:00"
draft = true
snippet = "Want to use custom fonts for your form input placeholder text? Check this out!"
title = "Custom Placeholder Text for Form Inputs"
tags = [
  "CSS",
  "Code Example",
  "HTML",
  "Javascript"
]
categories = [
  "Guide"
]
+++

Before we get started, here's a quick [Demo](http://codepen.io/somecallmejosh/full/xRgZJq/).

Every once in a while, us front end developers get some requests that make us scratch our heads. One of my recent head-scratchers was a request to use custom form placeholder fonts. At first it seemed like a reasonable request. I would just use a placeholder pseudo attribute and be on my merry way. Right? Wrong.

It turns out, browsers have interesting ways of interpreting placeholder pseudo attribute positioning. Each browser has it's own set of default styling to deal with. Before I knew it, I was over 100 lines in to a Sass Mixin to handle all the things I never thought I'd have to deal with. Here's an example:


{{< highlight scss >}}
@mixin default-placeholder {
  color: $licorice;
  font-family: $montserrat;
}

@mixin fly-out-placeholder {
  color: $pepper;
  font-family: $merriweather;
}

@mixin registration-placeholder {
  color: $warm-gray2;
  font-family: $montserrat;
  font-weight: 300;
}

@mixin search-placeholder {
  color: $licorice;
  font-family: $merriweather;
}

@mixin input-content($context: 'default', $font-size: 1.6rem, $line-height: 5rem) {
  input[type='email'],
  input[type='search'],
  input[type='text'] {
    font-size: $font-size;
    outline: none;

    @if $context == 'default' {
      @include default-placeholder;
    }

    @if $context == 'search' {
      @include search-placeholder;
    }

    @if $context == 'fly-out' {
      @include fly-out-placeholder;
    }
  }

  @if $context == 'default' or $context == 'registration' {
    :-moz-placeholder,
    ::-moz-placeholder {
      @if $context == 'default' {
        @include default-placeholder;
      }

      @if $context == 'registration' {
        @include registration-placeholder;
      }

      font-size: $font-size;
    }


    input:-ms-input-placeholder {
      @if $context == 'default' {
        @include default-placeholder;
      }

      @if $context == 'registration' {
        @include registration-placeholder;
      }

      font-size: $font-size;
    }

    input::-webkit-input-placeholder {
      @if $context == 'default' {
        @include default-placeholder;
      }

      @if $context == 'registration' {
        @include registration-placeholder;
      }
      font-size: $font-size;
    }

    input[type="text"]::placeholder,
    input[type="email"]::placeholder {
      @if $context == 'default' {
        @include default-placeholder;
      }

      @if $context == 'registration' {
        @include registration-placeholder;
      }

      font-size: $font-size;
    }
  }

  @if $context == 'search' {
    :-moz-placeholder,
    ::-moz-placeholder {
      color: rgba($chocolate, .4)!important;
      font-size: $font-size;
      font-style: italic;
    }

    input:-ms-input-placeholder {
      @include search-placeholder;
      color: rgba($chocolate, .4)!important;
      font-size: $font-size;
      font-style: italic;
    }

    input::-webkit-input-placeholder {
      @include search-placeholder;
      color: rgba($chocolate, .4)!important;
      font-size: $font-size;
      font-style: italic;
    }

    input[type="text"]::placeholder,
    input[type="email"]::placeholder {
      @include search-placeholder;
      color: rgba($chocolate, .4)!important;
      font-size: $font-size;
      font-style: italic;
    }
  }

  @if $context == 'fly-out' {
    :-moz-placeholder,
    ::-moz-placeholder {
      @include fly-out-placeholder;
      font-size: $font-size;
    }

    input:-ms-input-placeholder {
      @include fly-out-placeholder;
      font-size: $font-size;
    }

    input::-webkit-input-placeholder {
      @include fly-out-placeholder;
      font-size: $font-size;
    }

    input[type="text"]::placeholder,
    input[type="email"]::placeholder {
      @include fly-out-placeholder;
      font-size: $font-size;
    }
  }
}
{{< /highlight >}}

{{< highlight html >}}
<form action="#">
  <div class="form__group">
    <input type="text" name="firstName" required />
    <label for="firstName">First Name</label>
  </div>
  <div class="form__group">
    <input type="text" name="lastName" required />
    <label for="lastName">Last Name</label>
  </div>
  <div class="form__group">
    <input type="email" name="email" required=" " />
    <label for="email">Enter Your Email Address</label>
  </div>
  <div class="form__group">
    <input type="password" name="password" required />
    <label for="password">Password</label>
  </div>
</form>
{{< /highlight >}}

{{< highlight scss >}}
.form__group {
  background-color: #fff;
  border: #ccc 1px solid;
  border-bottom: none;
  width: 360px;
  height: 50px;
  position: relative;

  &:last-child {
    border-bottom: #ccc 1px solid;
  }

  &:focus {
    border-color: orange;
  }
}

label, input {
  left: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

label {
  color: #ccc;
  font: italic 400 14px 'Merriweather', serif;
  z-index: 0;
}

input {
  background-color: transparent;
  border: none;
  color: #313131;
  font: 400 15px 'Montserrat', sans-serif;
  height: 40px;
  outline: none;
  width: calc(100% - 20px);
  z-index: 1;

  &:required {
    // For Firefox
    box-shadow:none;
  }

  &:focus {
    color: #666;
    background-color: #fff;
  }

  &:valid {
    background-color: #fff;
  }

  &:invalid {
    color: red;
  }

  &.has-value {
    background-color: #fff;
  }
}
{{< /highlight >}}
