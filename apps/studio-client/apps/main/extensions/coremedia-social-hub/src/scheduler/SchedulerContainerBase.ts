import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import Container from "@jangaroo/ext-ts/container/Container";
import Config from "@jangaroo/runtime/Config";
import SchedulerContainer from "./SchedulerContainer";

interface SchedulerContainerBaseConfig extends Config<Container> {
}

class SchedulerContainerBase extends Container {
  declare Config: SchedulerContainerBaseConfig;

  #selectedDateVE: ValueExpression = null;

  constructor(config: Config<SchedulerContainer> = null) {
    super(config);
  }

  getSelectedDateVE(): ValueExpression {
    if (!this.#selectedDateVE) {
      this.#selectedDateVE = ValueExpressionFactory.createFromValue(undefined);
    }
    return this.#selectedDateVE;
  }

  protected calculateModifiersForDate(date: Date): Array<any> {
    const modifiers = [];
    //
    //    if (minDate && date < minDate) {
    //      modifiers.push(BEFORE_PROJECT_START_MODIFIER);
    //    }
    //    if (maxDate && maxDate < date) {
    //      modifiers.push(AFTER_PROJECT_END_MODIFIER);
    //    }
    //
    //    var todoByDate:* = getTodoByDateVE().getValue() || {};
    //    if (todoByDate.hasOwnProperty(date)) {
    //      var affectedTodos:Array = todoByDate[date] || [];
    //      if (affectedTodos.length > 0) {
    //        var now:Date = new Date();
    //
    //        var hasOverdueTodos:Boolean = affectedTodos.some(function (todo:Todo):Boolean {
    //          // time irrelevant here
    //          now.setHours(0,0,0,0);
    //          return todo.getDueDate() < now;
    //        });
    //
    //        var hasTodosInProgress:Boolean = affectedTodos.some(function (todo:Todo):Boolean {
    //          return todo.getTodoState() === TodoImpl.IN_PROGRESS_STATE;
    //        });
    //
    //        if (hasTodosInProgress && hasOverdueTodos) {
    //          modifiers.push(HAS_OVERDUE_TODOS_MODIFIER);
    //        } else if (hasTodosInProgress) {
    //          modifiers.push(HAS_OPEN_TODOS_MODIFIER);
    //        } else {
    //          modifiers.push(HAS_FINISHED_TODOS_MODIFIER);
    //        }
    //      }
    //    }

    return modifiers;
  }
}

export default SchedulerContainerBase;
