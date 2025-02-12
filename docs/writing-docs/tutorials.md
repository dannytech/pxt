# Tutorials

Step by step tutorials are authored in markdown and automatically converted by the editor. This page describes the format for these tutorials.

## How tutorials work

A tutorial is a sequence of steps that the user follows in a limited environment. The experience is designed to reduce the complexity of using the full editor to simply guiding the user through a precise sequence of limited interactions. Tutorials are used as "ramp up" tools to teach both how the editor works and how the basics of blocks work. An editor can have as many tutorials as needed.

Each step of the tutorial has a short description, or explanation, of the activity for the step and
possibly a block example. If the step includes a block example, the editor will restrict the selection of blocks from the toolbox to only those used in the example.

## Tutorial documents

Tutorials are simply markdown documents where each level 2 heading (``##``) is a new step. The tutorials can be located anywhere under the ``/docs`` folder although they usually are in the ``/docs/projects`` folder.

A tutorial with the title '**Light blaster**' would have a path like this: _/docs/projects/light-blaster.md_.

When a tutorial is chosen in the editor, the tutorial runner converts the content of the tutorial markdown into user interactions. If selected from the external documentation navigation, the tutorial is viewed the same as any other help document which allows it to be printed.

### ~ hint

#### A real example

See the micro:bit tutorials [**flashing-heart.md**](https://github.com/Microsoft/pxt-microbit/blob/master/docs/projects/flashing-heart.md) and
[**rock-paper-scissors.md**](https://github.com/Microsoft/pxt-microbit/blob/master/docs/projects/rock-paper-scissors.md).

### ~

## Listing on the home screen

To have a tutorial appear on the home screen, you will need to create or use an existing gallery and add a tutorial entry to it.

### Defining galleries

Tutorials typically appear as cards on the [home screen](/targets/home-screen#galleries). Each card category is a markdown file that is referenced from the ``targetconfig.json`` file. The ``galleries`` section in the configuration specifies a map of gallery titles to gallery markdown file paths. You can have as many galleries as you wish to organize your tutorials.

```
{
    ...
    "galleries": {
        "Tutorials": "projects/tutorials",
        "Games": "projects/games",
        ...
    }
}
```

Also, add a direct link to the tutorial in the ``SUMMARY.md`` page to help search engine bots.

### ~ hint

#### A real example

See the micro:bit config https://github.com/Microsoft/pxt-microbit/blob/master/targetconfig.json

### ~

#### Authoring the gallery

A gallery entry for a [tutorial](/targets/home-screen#tutorial) is placed in the markdown file mapped to the category. For the example above, it's in _/projects/tutorials.md_.

The gallery is defined by authoring ``codecards`` in the markdown section. Each ``codecard`` has the following fields:

* **name**: tutorial name
* **imageUrl**: an optional icon image
* **url**: tutorial document path
* **cardType**: set to "tutorial"
* **description**: description of what the tutorial does

Here's an example entry in _tutorials.md_:

````markdown
# Tutorials

Here are some cool tutorials to get you started with your Gizmo Board!

## Basic

```codecard
[{
  "name": "Flashing Heart",
  "url":"/projects/flashing-heart",
  "description": "Make an animated flashing heart.",
  "imageUrl": "/static/gizmo/projects/a1-display.png",
  "cardType": "tutorial",
  "label": "New? Start Here!",
  "labelClass": "purple ribbon large"
}, {
  "name": "Name Tag",
  "description": "Scroll your name on the screen",
  "imageUrl": "/static/gizmo/projects/name-tag.png",
  "url": "/projects/name-tag",
  "cardType": "tutorial"
}]
```
````

The tutorial document tree has this layout:

```
/docs/projects/tutorials.md
/docs/projects/flashing-heart.md
/docs/projects/name-tag.md
...
```

### ~ hint

#### A real example

See the micro:bit tutorial gallery https://github.com/Microsoft/pxt-microbit/blob/master/docs/tutorials.md

### ~

## In context tutorials

In context tutorials are micro-tutorials that run within your current program. They need to be enabled separately. The format is the same as other tutorials.

* (editor maintainer) add a ``recipes: true`` entry in the ``appTheme`` section of your ``pxtarget.json`` editor
* add a ``/docs/recipes.md`` file that contains the gallery of micro-tutorials

In order to select the proper language (blocks vs JavaScript vs Python), you should add
a ``"editor": "js"`` entry for JavaScript tutorials and ``"editor": "py"`` entry for Python tutorials to each code card.

## Tutorial format

The tutorial markdown has a format that the guides the tutorial runner in making a sequence of interactions. A tutorial has a flow model that is either a simple set of steps or groups of steps placed into activity sections. The tutorial author chooses which type of flow to use by setting a metadata option.

### Metadata

Tutorial metadata is optionally specified at the top of the document. Metadata is defined as key-value pairs, in the form: ``### @KEY VALUE``. The currrent properties are:

* **activities**: Indicates a three-level tutorial, with activities and steps within the activities. The default is ``false`` which means that the tutorial is just a simple sequence of steps.
* **explicitHints**: Indicates explicit hints, in the format ``### ~ tutorialhint``. The default  is ``false`` making hints available for each step.

```markdown
### @activities true
### @explicitHints true
```

### Title

For a step based tutorial, the title is on the first line and uses a _level 1_ heading.


```markdown
# Light blaster
```

In an activity style tutorial, the title can appear in a psuedo-activity that serves as an introduction. The title is also displayed in the tutorial control bar.

```markdown
### @activities true

## Introduction

### Introduction step @unplugged

![Lights flashing](/static/tutorials/light-blaster/flashing-lights.gif)

# Light blaster

The amazing blast of bright light! Make a program to flash the LEDs.
```

### Activities

Tutorials with **activities** enabled in the metadata have multiple _activities_, each consisting of several steps. An activity begins with a _level 2_ heading (``##``) followed by the activity name. The activity name is displayed in the tutorial control bar next to the step progress counter and step advance controls. An activity can have any number of steps, but no activity-specific text.

```markdown
## Activity 1

### Step 1

Instructions for step 1 of activity 1 here...

### Step 2

Instructions for step 2 of activity 1 here...

## Activity 2

### Step 1

Instructions for step 1 of activity 2 here...
```

### Steps

A step is where the user views and interacts with the instructions and hints for a tutorial action. The runner builds interactions from each _step_ section. 

#### Default Syntax

By default, a step begins with a _level 2_ heading (``##``), followed by the step name.

#### Activity Syntax

If the tutorial has **activities** enabled in the metadata, steps begin with a _level 3_ heading (``###``), followed by the name.

#### Step format

The step can have any name, but it's common to use the _Step 1, Step 2,...Step n_ sequence for each heading.

```markdown
## Step 1

Instructions for step 1 here...

## Step 2

Instructions for step 2 here...
```

The text in the heading is shown only when the tutorial is viewed as a help page. It's ok to have additional text in the heading. The word 'Step' can even be left out since the tutorial runner will build the list of steps only from the content under the heading tag, ``##``. These are valid headings:

```markdown
### Step 3: Make a new variable
```

>--or--

```markdown
## Flash all the LEDs on and off twice
```

The editor automatically parses the markdown and populates the user interface from each step section.

### Hints

Hints provide additional information and code suggestions to help the user complete the step.

#### Default Syntax

In each step, any text before the first code snippet or image is automatically displayed to the user in the tutorial caption. The remaining text, block examples, etc. are displayed in the ``hint`` dialog when the user clicks the caption or hint button.

#### Explicit Syntax

If the **explicitHints** flag is specified in the tutorial metadata, the tutorial will only show hints that are explicitly defined with the hint tag, as follows: `#### ~ tutorialhint`. The hint automatically terminates at the next heading. One hint can be specified per step, and if no hint is specified all text (including blocks) will be displayed in the tutorial caption.

````markdown
#### ~ tutorialhint
Try clicking on the 'Basic' drawer to find the blocks you need! Your code should look like this:

```blocks
basic.showString("Micro!")
```
````

### ~ hint

#### Simple, short descriptions

During an interaction, the step description (all text before the first code block or image) is shown in the caption. If the paragraph length goes beyond the display length of caption, a "More" button appears in order to view the rest of the paragraph. It's best to keep the paragraph short enough to so all of it appears in the caption without requiring the user to click to see it all. If your instructions need more text, you can just create an additional step to split up the activity.

### ~

## Step modifiers

To add a special behavior to a step, use a step modifier:

### fullscreen

If you want to include a dramatic introduction or make certain that a special message is seen, you can use the ``@fullscreen`` tag. The section is displayed in an overlay window on top of the tutorial screen and isn't shown in the caption as part of the tutorial flow. You include it in your tutorial like this:

```markdown
# Flash-a-rama

## It's time to code! @fullscreen

Let's get real bright. We're going to make all the lights flash on your board!

![Flash lights](/static/tutorials/lights-flashing.gif)

## Step 1: Make a new variable

...
```

### unplugged

If you want to display your tutorial step in a dialog and then have it skip to the next step automatically, use ``@unplugged``. This feature is typically used for introductory steps.

```markdown
# Flash-a-rama

## It's time to code! @unplugged

```


### tutorialCompleted

To signify that this step in the tutorial is the "last step", even if more steps are present in the markdown, use ``@tutorialCompleted``. This has no impact on how tutorial progress is displayed; it is only used by MakeCode editors that do something external when a tutorial is completed.

```markdown
# Flash-a-rama

## This is the last step @tutorialCompleted

## This is a bonus activity that comes after the last step

```

## Testing

When developing your new tutorials, it is easiest to first render and view them as a markdown documentation page until all steps look OK to you. Going through all the steps several times using the tutorial runner might become quite tedious while developing the tutorial.

If you are running the local server, go to ``http://localhost:3232/tutorials`` to render the ``/docs/tutorials.md`` gallery page.

The [pxt checkdocs](/cli/checkdocs) command will compile all the tutorial snippets automatically.

```
pxt checkdocs
```

## Example

The following sample shows a simple 2 step tutorial.

````markdown
# Getting started

## Introduction @unplugged

Let's get started!

## Step 1 @fullscreen

Welcome! Place the ``||basic:show string||`` block in the ``||basic:on start||`` slot to scroll your name.

```blocks
basic.showString("Micro!")
```

## Step 2

Click ``|Download|`` to transfer your code in your @boardname@!

````

## Translations

Tutorials are translated via [Crowdin](/translate) like any other documentation page.
