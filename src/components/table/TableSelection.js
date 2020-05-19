export class TableSelection {
  static selectedClass = 'selected';

  static groupClass = 'group';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    $el.focus().addClass(TableSelection.selectedClass);
    this.group.push($el);
    this.current = $el;
  }

  clear() {
    this.group.forEach($el =>
      $el.removeClass(TableSelection.selectedClass, TableSelection.groupClass)
    );
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach($el =>
      $el.addClass(TableSelection.selectedClass, TableSelection.groupClass)
    );
  }
}
