Ext.define("com.coremedia.blueprint.social.scheduler.SchedulerContainerBase", function(SchedulerContainerBase) {/*package com.coremedia.blueprint.social.scheduler {
import com.coremedia.blueprint.social.*;

import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;

import ext.Component;
import ext.container.Container;

import ext.panel.Panel;

public class SchedulerContainerBase extends Container {
  private var selectedDateVE:ValueExpression;

  public*/ function SchedulerContainerBase$(config/*:SchedulerContainer = null*/) {if(arguments.length<=0)config=null;
    this.super$9Jsw(config);
  }/*


  internal*/ function getSelectedDateVE()/*:ValueExpression*/ {
    if (!this.selectedDateVE$9Jsw) {
      this.selectedDateVE$9Jsw = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(undefined);
    }
    return this.selectedDateVE$9Jsw;
  }/*


  protected*/ function calculateModifiersForDate(date/*:Date*/)/*:Array*/ {
    var modifiers/*:Array*/ = [];
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
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.container.Container",
      selectedDateVE$9Jsw: null,
      constructor: SchedulerContainerBase$,
      super$9Jsw: function() {
        Ext.container.Container.prototype.constructor.apply(this, arguments);
      },
      getSelectedDateVE: getSelectedDateVE,
      calculateModifiersForDate: calculateModifiersForDate,
      requires: [
        "Ext.container.Container",
        "com.coremedia.ui.data.ValueExpressionFactory"
      ]
    };
});
