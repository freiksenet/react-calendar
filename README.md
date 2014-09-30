react-calendar
--------------

Calendars for React.

Not just calendar component, but a modular toolkit for building everything
related to calendars in React, such as Datepickers.

In early alpha stage, documentation and features will arrive.

Example
-------

```
npm install
npm run
```

One year calendar ([Demo](http://freiksenet.github.io/react-calendar/)):

```html
<Calendar firstMonth={1}                <!-- Base calendar compoment -->
          date={moment("2014-01-01")}
          weekNumbers={true}
          size={12}>
  <Month date={moment()}                <!-- Pass subcomponents to mark -->
         modifiers={{current: true}}/>  <!-- current month and day -->
  <Day date={moment()}
       modifiers={{current: true}} />
</Calendar>
```

Each component can be used separately AND passed to other components to modify
rendering.

```html
<Month date={moment()} />
```

Styling
-------

There is no style by default, but an example theme using bootstrap is included
in less/bootstrap-theme.less.
