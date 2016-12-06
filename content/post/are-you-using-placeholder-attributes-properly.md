+++
authors = "Joshua Briley"
cloudinary = "v1479502856/custom-typography.jpg"
date = "2016-11-18T15:57:14-05:00"
draft = false
snippet = "Are you being tricked into improper use of placeholder attributes? I was!"
title = "Are You Using Placeholder Attributes Properly?"
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

HTML. It's the tool many developers treat as a byproduct of real code. So many relegate it to the ranks of non-programmers. It's unfortunate. On the web, HTML is the product consumed by the user. It's where all the SEO happens. It's where all the accessibility happens. Treating HTML as a first-class citizen is important. Knowing and respecting HTML can save time and lower frustration. In this post, I'll show you how knowing some minor nuance could've save me a lot of frustration.

## Sometimes the wrong way teaches us the right way

The complexities of styling placeholder attributes taught me a lesson. I think we've all tried to do some minor styling of placeholder content. In the past, I changed the font size or the color. A more recent challenge proved more difficult. We needed a professional font, at a specific size, at full opacity. Let the fun begin.

Styling the placeholder attribute was a continuous path of frustration. I had no idea how to edit placeholder styles in dev tools. I couldn't do it in the browser. So, I had to reload my Rails app every time I changed a style. Sass change, refresh. I began to notice a bunch of inconsistencies between browsers. Alignment issues. Opacity issues. I felt like I was doing this all wrong. As it turns out, I was.

## Placeholder attributes and form labels are different

You may be thinking, "yes, I know that. Everyone knows that." Take a look at [this example](https://somecallmejosh.github.io/atk-form-validation/side-by-side-form.html). Looks like a regular email form with a placeholder, right? Well, let's look at the differences between a placeholder and a form label:

> The `<label>` attribute describes the role of the form element.  it indicates expected information. Placeholder attribute is a hint about the format that the content should take. There are cases in which the placeholder attribute is never displayed to the user. The form must be understandable without it. -- Paraphrased from Mozilla Developer Network

There's no placeholder in this form, according to this definition. The content *Enter Your Email Address* is more consistent with the definition of a form label. `email@youremail.com` would be more inline with a placeholder attribute. I had been treating a form label like a placeholder attribute. Seems innocent enough, but it led to much more work. Let's take a look.

## Placeholder Attribute Style Challenges

Default browser styles for placeholder attributes are not consistent. Safari and Chrome apply an opacity to them. Firefox does not. The vertical alignment is different between them, also. Overriding these defaults takes a lot of CSS.

{{< highlight scss >}}
::placeholder,
::-webkit-input-placeholder,
:-ms-input-placeholder,
::-ms-input-placeholder,
:-moz-placeholder,
::-moz-placeholder {
  opacity: 1;
}
{{< /highlight >}}


### User Agent Shadow DOM is Not Enabled By Default.

Through the magic of landing in a good stack overflow thread, I learned how to [inspect the shadow DOM in Chrome](http://stackoverflow.com/questions/26126587/how-to-enable-show-user-agent-shadow-dom-in-chrome-using-a-command-line-switch). This helped me reason about some of the browser inconsistencies mentioned above. Overcoming each browser nuance took a lot of CSS. I can't imagine the time spent working through this could yield any sort of return. Take a look at this Sass example using the [Google font, Merriweather](https://fonts.google.com/specimen/Merriweather?selection.family=Merriweather):

### Placeholder Stying is Not DRY

{{< highlight scss >}}
@mixin input-content($font-size: 1.6rem) {
  [type='email'] {
    color: #333;
    font-family: $montserrat;
    font-size: $font-size;
    outline: none;
  }

  :-moz-placeholder,
  ::-moz-placeholder {
      color: #333;
      font-family: 'Merriweather', serif;
      font-size: $font-size;
  }
   :-ms-input-placeholder {
     color: #333;
     font-family: 'Merriweather', serif;
     font-size: $font-size;
   }

    ::-webkit-input-placeholder {
      color: #333;
      font-family: 'Merriweather', serif;
      font-size: $font-size;
    }

    ::placeholder  {
     color: #333;
     font-family: 'Merriweather', serif;
     font-size: $font-size;
   }
}
{{< /highlight >}}

Notice how I wasn't able to combine selectors. This violates DRY (Don't Repeat Yourself) development strategies. This isn't a lack of refactoring. This repetition was required.

### This Would Have Been Cooler, But Fuggetabotit!

{{< highlight scss >}}
[type='email'],
:-moz-placeholder,
::-moz-placeholder,
::-webkit-input-placeholder,
:-ms-input-placeholder,
::placeholder {
   color: #333;
   font-family: $montserrat;
   font-size: $font-size;
}
{{< /highlight >}}

Nope. No dice. The above snippet just doesn't work. Bummer. There were other issues to address. Placeholders don't work in Opera Mini, for instance.

That's how I started this process. Nothing worked as expected. Troubleshooting was difficult. It was frustrating. But, I learned something. I know what's involved in styling these suckers. And, I'm also more aware of what I'm actually building. And, I have even more respect for HTML. When used properly, it's quite a joy to work with.

Let's move on and take a look at the approach I ended up using.

## Form Labels As Opposed To Placeholder Attributes

I'll start by saying that **form labels are much easier to style**. No crazy browser defaults. Nothing hiding in shadow DOM. No surprises. Here's my refactored solution:

### Email Form Markup

{{< highlight html >}}
<form action="#" class="atkForm atkForm--side-by-side form-1" novalidate>
  <div class="atkForm__fields">
    <div class="atkForm__group">
      <label class="atkForm__group--label" for="email">Enter Your Email Address</label>
      <input class="atkForm__group--input" type="email" name="email" required />
      <div class="atkForm__group--error">Email is required</div>
    </div>
  </div>
  <div class="atkForm__action">
    <button class="atkForm__submit" type="submit">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    </button>
  </div>
</form>
{{< /highlight >}}

## SCSS

Since this is a complete refactor, the following styles are more like wireframes. Nothing fancy. I'm using the [Montserrat Google Font](https://fonts.google.com/specimen/Montserrat), as opposed to Merriweather. Additionally, I use [BEM style SCSS syntax](https://css-tricks.com/snippets/sass/bem-mixins/) for almost all of my Sass work. I highly recommend it.

{{< highlight scss >}}
$field-height: 50px;

.atkForm {
  input,
  input[type="search"],
  textarea {
    // For Safari zooming issues
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    font-size: 16px;
    padding: 0;
  }

  &__group {
    background-color: #fff;
    border: #ccc 1px solid;
    border-bottom: none;
    height: $field-height;
    position: relative;
    width: 100%;

    &:last-child {
      border-bottom: #ccc 1px solid;
    }

    &--error {
      display: none;
      color: red;
      font: 10px "Montserrat", sans-serif;
      position: absolute;
      z-index: 2;
      text-transform: uppercase;

      .invalid & {
        display: block;
      }
    }

    &--input,
    &--label {
      left: 10px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }

    &--input {
      background-color: transparent;
      border: none;
      color: #313131;
      font: 400 15px 'Montserrat', sans-serif;
      height: $field-height - 10px;
      outline: none;
      width: calc(100% - 20px);
      z-index: 1;

      &:focus {
        color: #666;
        background-color: #fff;
      }

      &:required {
        box-shadow:none;
      }

      &.has-value {
        background-color: #fff;
      }
    }

    &--label {
      color: #ccc;
      font: italic 400 14px 'Merriweather', serif;
      z-index: 0;
    }

    &--message {
      color: #ccc;
      cursor: pointer;
      font: 10px "Montserrat", sans-serif;
      padding: 5px;
      position: absolute;
      right: 0;
      text-align: right;
      top: 0;
      z-index: 2;

      &:hover {
        color: #999;
      }

      span {
        color: #fff;
        background-color: #ccc;
        border-radius: 100%;
        display: inline-block;
        height: 12px;
        text-align: center;
        width: 12px;
        vertical-align: middle;
      }
    }
  }

  // Form layout
  // I also have a stacked version of this form.
  // Only felt the need to show this single layout.
  &--side-by-side {
    display: flex;
    width: 100%;

    &.form-submitted {
      display: block;
    }

    .atkForm {
      &__action {
        flex-basis: max-content;
        max-height: $field-height;
        overflow: hidden;
        max-width: 40%;
      }

      &__fields {
        flex: auto;
      }

      &__group {
        &--error {
          color: red;
          left: 10px;
          bottom: -30px;
        }
      }

      &__submit {
        width: 100%;
        padding: 0 25px;
        position: relative;

        svg {
          fill: #fff;
          height: 20px;
          width: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      }
    }
  }

  &__submit {
    -webkit-appearance: none;
    background-color: #333;
    border: #333 1px solid;
    border-radius: 0;
    color: #fff;
    cursor: pointer;
    font: 400 12px 'Montserrat', sans-serif;
    height: $field-height;
    text-transform: uppercase;

    &:hover {
      background-color: darken(#333, 10%);
    }
  }

  &__submitted {
    font: 400 12px 'Montserrat', sans-serif;
  }

  &__wrapper {
    background-color: #f4f4f4;
    padding: 10px;
    border: #ccc 1px solid;
  }
}
{{< /highlight >}}



## Javascript

I'm using javascript (with jQuery) for some basic form validation.

{{< highlight javascript >}}
'use strict';

var form = $('form'),
    formFields = $('.atkForm__fields'),
    formSubmit = $('.atkForm__submit'),
    parentGroup = $('.atkForm__group'),
    formError = $('.atkForm__group--error');


$('form input').blur(function() {
  var $this = $(this);
  // 'has-value' css class adds a bacgkround color the form input
  // The input is z-indexed in front of the form label, allowing the
  // label to show through if the input is blank. This eliminates
  // the issues associated with styling [placeholder] content.
  if($this.val()) {
    $this.addClass('has-value');
  } else {
    $this.removeClass('has-value');
  }
}).focus(function(){
  // If the form group has an `invalid` class (set by the checkForm() below),
  // remove the invalid class when the user clicks into the form field.
  // This 'hides' the form error message while the user is typing.
  var $this = $(this);
  if($this.closest(parentGroup).text().length) {
    $this.closest(parentGroup).removeClass('invalid');
  }
});

function checkForm(e) {
  e.preventDefault();
  var $this = $(this);

  //  IF items are invalid, return false.
  var invalidFields = false,
      requiredFields = $this.find($('[required]'));

  $.each( requiredFields, function( i, field ) {
    var inlineErrorMessage = $(field).closest(parentGroup).find(formError).text(),
        isEmail = $(field).attr('type') === "email";

    function showInlineErrorMessage(errorMessage) {
      if($(field).val() === '') {
        $(field).closest(parentGroup).addClass('invalid');
        $(field).closest(parentGroup).find(formError).text(errorMessage);
        invalidFields = true;
      }
    }

    if(isEmail) {
      // If Email field has a value, run email validation on it.
      if($(field).val().length) {
        var regexFilter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var emailText = $(field).val();
        if(!regexFilter.test(emailText)) {
          $(field).closest(parentGroup).find(formError).text('This is an invalid email');
          $(field).closest(parentGroup).addClass('invalid');
          invalidFields = true;
        }
      }
      // Otherwise, show default error message for required input that is blank.
      showInlineErrorMessage('Email is required');
    } else {
      // All other fields do not require regex validation.
      showInlineErrorMessage(inlineErrorMessage);
    }

  });

  if(invalidFields){
    return false;
  }

  $this.find(parentGroup).hide();
  $this.find(formSubmit).hide();
  $(this).addClass('form-submitted');
  $this.append('<p class="atkForm__submitted">Thanks for submitting this form.</p>');

  return true;
}

form.on('submit', checkForm);
{{< /highlight >}}

## In Conclusion

I hope this post helps you appreciate some of the nuances of HTML. Forms and other elements become much easier to work with. CSS becomes less of a pain to deal with. Things become explicit and easy to reason about by the next person working on the project. Until next time, keep it simple, and happy coding.