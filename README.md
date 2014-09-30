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

TODO
----

* Events
* Calendar should be able to page
* A component for Year - Calendar is supposed to be a 'controller' component for
  page-able calendar
* A component that is on lower level that Day - for events.
* Utils to create range of components for modifying multiple components easier
* An example datepicker component using react-calendar
* Tests
