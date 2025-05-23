import {
  Overlay
} from "./chunk-6LCUWHMZ.js";
import {
  AutoFocus
} from "./chunk-3MBEO5MG.js";
import {
  Ripple
} from "./chunk-XTGU7KIS.js";
import "./chunk-5G7WYC4N.js";
import "./chunk-2ZXM7VXU.js";
import {
  AngleRightIcon,
  ChevronDownIcon,
  TimesIcon
} from "./chunk-SJU3SHUH.js";
import {
  BaseComponent
} from "./chunk-7TM5EEZP.js";
import "./chunk-LWGOPU6J.js";
import {
  BaseStyle
} from "./chunk-6EZBL25G.js";
import {
  OverlayService,
  PrimeTemplate,
  SharedModule,
  TranslationKeys,
  calculateScrollbarWidth,
  equals,
  findLastIndex,
  findSingle,
  focus,
  getHiddenElementOuterWidth,
  getOffset,
  getOuterWidth,
  getViewport,
  isEmpty,
  isNotEmpty,
  isPrintableCharacter,
  resolveFieldData,
  uuid
} from "./chunk-3NELQC5U.js";
import {
  NG_VALUE_ACCESSOR
} from "./chunk-BMBTPMFB.js";
import "./chunk-3D5YJ6TY.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-6SMXVPEZ.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation$1,
  booleanAttribute,
  computed,
  effect,
  forwardRef,
  inject,
  numberAttribute,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsetNgModuleScope,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-FUF4CDAW.js";
import "./chunk-PEBH6BBU.js";
import "./chunk-WPM5VTLQ.js";
import "./chunk-4S3KYZTJ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-cascadeselect.mjs
var theme = ({
  dt
}) => `
.p-cascadeselect {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    user-select: none;
    background: ${dt("cascadeselect.background")};
    border: 1px solid ${dt("cascadeselect.border.color")};
    transition: background ${dt("cascadeselect.transition.duration")}, color ${dt("cascadeselect.transition.duration")}, border-color ${dt("cascadeselect.transition.duration")}, outline-color ${dt("cascadeselect.transition.duration")}, box-shadow ${dt("cascadeselect.transition.duration")};
    border-radius: ${dt("cascadeselect.border.radius")};
    outline-color: transparent;
    box-shadow: ${dt("cascadeselect.shadow")};
}

p-cascadeselect.ng-invalid.ng-dirty .p-cascadeselect {
    border-color: ${dt("cascadeselect.invalid.border.color")};
}

p-cascadeselect.ng-invalid.ng-dirty .p-cascadeselect.p-focus {
    border-color: ${dt("cascadeselect.focus.border.color")};
}

.p-cascadeselect:not(.p-disabled):hover {
    border-color: ${dt("cascadeselect.hover.border.color")};
}

.p-cascadeselect:not(.p-disabled).p-focus {
    border-color: ${dt("cascadeselect.focus.border.color")};
    box-shadow: ${dt("cascadeselect.focus.ring.shadow")};
    outline: ${dt("cascadeselect.focus.ring.width")} ${dt("cascadeselect.focus.ring.style")} ${dt("cascadeselect.focus.ring.color")};
    outline-offset: ${dt("multiscascadeselectelect.focus.ring.offset")};
}

.p-cascadeselect.p-variant-filled {
    background: ${dt("cascadeselect.filled.background")};
}

.p-cascadeselect.p-variant-filled:not(.p-disabled):hover {
    background: ${dt("cascadeselect.filled.hover.background")};
}

.p-cascadeselect.p-variant-filled.p-focus {
    background: ${dt("cascadeselect.filled.focus.background")};
}

.p-cascadeselect.p-disabled {
    opacity: 1;
    background: ${dt("cascadeselect.disabled.background")};
}

.p-cascadeselect-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    color: ${dt("cascadeselect.dropdown.color")};
    width: ${dt("cascadeselect.dropdown.width")};
    border-start-end-radius: ${dt("border.radius.md")};
    border-end-end-radius: ${dt("border.radius.md")};
}

.p-cascadeselect-label {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    flex: 1 1 auto;
    width: 1%;
    text-overflow: ellipsis;
    cursor: pointer;
    padding: ${dt("cascadeselect.padding.y")} ${dt("cascadeselect.padding.x")};
    background: transparent;
    border: 0 none;
    outline: 0 none;
}

.p-cascadeselect-label.p-placeholder {
    color: ${dt("cascadeselect.placeholder.color")};
}

p-cascadeselect.ng-invalid.ng-dirty .p-cascadeselect-label.p-placeholder {
    color: ${dt("cascadeselect.invalid.placeholder.color")};
}

.p-cascadeselect.p-disabled .p-cascadeselect-label {
    color: ${dt("cascadeselect.disabled.color")};
}

.p-cascadeselect-label-empty {
    overflow: hidden;
    visibility: hidden;
}

.p-cascadeselect-fluid {
    display: flex;
}

.p-cascadeselect-fluid .p-cascadeselect-label {
    width: 1%;
}

.p-cascadeselect-overlay {
    background: ${dt("cascadeselect.overlay.background")};
    color: ${dt("cascadeselect.overlay.color")};
    border: 1px solid ${dt("cascadeselect.overlay.border.color")};
    border-radius: ${dt("cascadeselect.overlay.border.radius")};
    box-shadow: ${dt("cascadeselect.overlay.shadow")};
}

.p-cascadeselect .p-cascadeselect-overlay {
    min-width: 100%;
}

.p-cascadeselect-option-list {
    display: none;
    min-width: 100%;
    position: absolute;
    z-index: 1;
}

.p-cascadeselect-list {
    min-width: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;
    padding: ${dt("cascadeselect.list.padding")};
    display: flex;
    flex-direction: column;
    gap: ${dt("cascadeselect.list.gap")}
}

.p-cascadeselect-option {
    cursor: pointer;
    font-weight: normal;
    white-space: nowrap;
    border: 0 none;
    color: ${dt("cascadeselect.option.color")};
    background: transparent;
    transition: background ${dt("cascadeselect.transition.duration")}, color ${dt("cascadeselect.transition.duration")}, border-color ${dt("cascadeselect.transition.duration")}, box-shadow ${dt("cascadeselect.transition.duration")}, outline-color ${dt("cascadeselect.transition.duration")};
    border-radius: ${dt("cascadeselect.option.border.radius")};
}

.p-cascadeselect-option-active {
    overflow: visible;
}

.p-cascadeselect-option-active > .p-cascadeselect-option-content {
    background: ${dt("cascadeselect.option.focus.background")};
    color: ${dt("cascadeselect.option.focus.color")};
}

.p-cascadeselect-option:not(.p-cascadeselect-option-selected):not(.p-disabled).p-focus > .p-cascadeselect-option-content {
    background: ${dt("cascadeselect.option.focus.background")};
    color: ${dt("cascadeselect.option.focus.color")};
}

.p-cascadeselect-option:not(.p-cascadeselect-option-selected):not(.p-disabled).p-focus > .p-cascadeselect-option-content > .p-cascadeselect-group-icon-container > .p-cascadeselect-group-icon {
    color: ${dt("cascadeselect.option.icon.focus.color")};
}

.p-cascadeselect-option-selected > .p-cascadeselect-option-content {
    background: ${dt("cascadeselect.option.selected.background")};
    color: ${dt("cascadeselect.option.selected.color")};
}

.p-cascadeselect-option-selected.p-focus > .p-cascadeselect-option-content {
    background: ${dt("cascadeselect.option.selected.focus.background")};
    color: ${dt("cascadeselect.option.selected.focus.color")};
}

.p-cascadeselect-option-active > .p-cascadeselect-option-list {
    inset-inline-start: 100%;
    top: 0;
}

.p-cascadeselect-option-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    padding: ${dt("cascadeselect.option.padding")};
    border-radius: ${dt("cascadeselect.option.border.radius")};
    transition: background ${dt("cascadeselect.transition.duration")}, color ${dt("cascadeselect.transition.duration")}, border-color ${dt("cascadeselect.transition.duration")}, box-shadow ${dt("cascadeselect.transition.duration")}, outline-color ${dt("cascadeselect.transition.duration")};
}

.p-cascadeselect-group-icon {
    font-size: ${dt("cascadeselect.option.icon.size")};
    width: ${dt("cascadeselect.option.icon.size")};
    height: ${dt("cascadeselect.option.icon.size")};
    color: ${dt("cascadeselect.option.icon.color")};
}

.p-cascadeselect-group-icon:dir(rtl) {
    transform: rotate(180deg);
}

.p-cascadeselect-mobile-active .p-cascadeselect-option-list {
    position: static;
    box-shadow: none;
    border: 0 none;
    padding-inline-start: 1rem;
    padding-inline-end: 0;
}

.p-cascadeselect-mobile-active .p-cascadeselect-group-icon {
    transition: transform 0.2s;
    transform: rotate(90deg);
}

.p-cascadeselect-mobile-active .p-cascadeselect-option-active > .p-cascadeselect-option-content .p-cascadeselect-group-icon {
    transform: rotate(-90deg);
}

.p-cascadeselect-sm .p-cascadeselect-label {
    font-size: ${dt("cascadeselect.sm.font.size")};
    padding-block: ${dt("cascadeselect.sm.padding.y")};
    padding-inline: ${dt("cascadeselect.sm.padding.x")};
}

.p-cascadeselect-sm .p-cascadeselect-dropdown .p-icon {
    font-size: ${dt("cascadeselect.sm.font.size")};
    width: ${dt("cascadeselect.sm.font.size")};
    height: ${dt("cascadeselect.sm.font.size")};
}

.p-cascadeselect-lg .p-cascadeselect-label {
    font-size: ${dt("cascadeselect.lg.font.size")};
    padding-block: ${dt("cascadeselect.lg.padding.y")};
    padding-inline: ${dt("cascadeselect.lg.padding.x")};
}

.p-cascadeselect-lg .p-cascadeselect-dropdown .p-icon {
    font-size: ${dt("cascadeselect.lg.font.size")};
    width: ${dt("cascadeselect.lg.font.size")};
    height: ${dt("cascadeselect.lg.font.size")};
}

/* For PrimeNG */
.p-cascadeselect-clear-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    color: ${dt("cascadeselect.clear.icon.color")};
}`;
var inlineStyles = {
  root: ({
    props
  }) => ({
    position: props.appendTo === "self" ? "relative" : void 0
  })
};
var classes = {
  root: ({
    instance,
    props
  }) => ["p-cascadeselect p-component p-inputwrapper", {
    "p-cascadeselect-mobile": instance.queryMatches(),
    "p-disabled": props.disabled,
    "p-invalid": props.invalid,
    "p-variant-filled": props.variant ? props.variant === "filled" : instance.config.inputStyle === "filled" || instance.config.inputVariant === "filled",
    "p-focus": instance.focused,
    "p-inputwrapper-filled": props.modelValue,
    "p-inputwrapper-focus": instance.focused || instance.overlayVisible,
    "p-cascadeselect-open": instance.overlayVisible,
    "p-cascadeselect-fluid": props.fluid,
    "p-cascadeselect-sm p-inputfield-sm": props.size === "small",
    "p-cascadeselect-lg p-inputfield-lg": props.size === "large"
  }],
  label: ({
    instance,
    props
  }) => ["p-cascadeselect-label", {
    "p-placeholder": instance.label === props.placeholder,
    "p-cascadeselect-label-empty": !instance.$slots["value"] && (instance.label === "p-emptylabel" || instance.label.length === 0)
  }],
  dropdown: "p-cascadeselect-dropdown",
  loadingIcon: "p-cascadeselect-loading-icon",
  dropdownIcon: "p-cascadeselect-dropdown-icon",
  overlay: ({
    instance
  }) => ["p-cascadeselect-overlay p-component", {
    "p-cascadeselect-mobile-active": instance.queryMatches()
  }],
  listContainer: "p-cascadeselect-list-container",
  list: "p-cascadeselect-list",
  option: ({
    instance,
    processedOption
  }) => ["p-cascadeselect-option", {
    "p-cascadeselect-option-active": instance.isOptionActive(processedOption),
    "p-cascadeselect-option-selected": instance.isOptionSelected(processedOption),
    "p-focus": instance.isOptionFocused(processedOption),
    "p-disabled": instance.isOptionDisabled(processedOption)
  }],
  optionContent: "p-cascadeselect-option-content",
  optionText: "p-cascadeselect-option-text",
  groupIcon: "p-cascadeselect-group-icon",
  optionList: "p-cascadeselect-overlay p-cascadeselect-option-list"
};
var CascadeSelectStyle = class _CascadeSelectStyle extends BaseStyle {
  name = "cascadeselect";
  theme = theme;
  classes = classes;
  inlineStyles = inlineStyles;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵCascadeSelectStyle_BaseFactory;
    return function CascadeSelectStyle_Factory(__ngFactoryType__) {
      return (ɵCascadeSelectStyle_BaseFactory || (ɵCascadeSelectStyle_BaseFactory = ɵɵgetInheritedFactory(_CascadeSelectStyle)))(__ngFactoryType__ || _CascadeSelectStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _CascadeSelectStyle,
    factory: _CascadeSelectStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CascadeSelectStyle, [{
    type: Injectable
  }], null, null);
})();
var CascadeSelectClasses;
(function(CascadeSelectClasses2) {
  CascadeSelectClasses2["root"] = "p-cascadeselect";
  CascadeSelectClasses2["label"] = "p-cascadeselect-label";
  CascadeSelectClasses2["dropdown"] = "p-cascadeselect-dropdown";
  CascadeSelectClasses2["loadingIcon"] = "p-cascadeselect-loading-icon";
  CascadeSelectClasses2["dropdownIcon"] = "p-cascadeselect-dropdown-icon";
  CascadeSelectClasses2["overlay"] = "p-cascadeselect-overlay";
  CascadeSelectClasses2["listContainer"] = "p-cascadeselect-list-container";
  CascadeSelectClasses2["list"] = "p-cascadeselect-list";
  CascadeSelectClasses2["item"] = "p-cascadeselect-item";
  CascadeSelectClasses2["itemContent"] = "p-cascadeselect-item-content";
  CascadeSelectClasses2["itemText"] = "p-cascadeselect-item-text";
  CascadeSelectClasses2["groupIcon"] = "p-cascadeselect-group-icon";
  CascadeSelectClasses2["itemList"] = "p-cascadeselect-item-list";
})(CascadeSelectClasses || (CascadeSelectClasses = {}));
var _c0 = (a0) => ({
  $implicit: a0
});
function CascadeSelectSub_ng_template_1_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function CascadeSelectSub_ng_template_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, CascadeSelectSub_ng_template_1_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 8);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const processedOption_r2 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.optionTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, processedOption_r2 == null ? null : processedOption_r2.option));
  }
}
function CascadeSelectSub_ng_template_1_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 9);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const processedOption_r2 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵattribute("data-pc-section", "text");
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r2.getOptionLabelToRender(processedOption_r2));
  }
}
function CascadeSelectSub_ng_template_1_span_5_AngleRightIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleRightIcon");
  }
}
function CascadeSelectSub_ng_template_1_span_5_2_ng_template_0_Template(rf, ctx) {
}
function CascadeSelectSub_ng_template_1_span_5_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, CascadeSelectSub_ng_template_1_span_5_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function CascadeSelectSub_ng_template_1_span_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 10);
    ɵɵtemplate(1, CascadeSelectSub_ng_template_1_span_5_AngleRightIcon_1_Template, 1, 0, "AngleRightIcon", 11)(2, CascadeSelectSub_ng_template_1_span_5_2_Template, 1, 0, null, 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵattribute("data-pc-section", "groupIcon");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.groupicon);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.groupicon);
  }
}
function CascadeSelectSub_ng_template_1_p_cascadeselect_sub_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-cascadeselect-sub", 13);
    ɵɵlistener("onChange", function CascadeSelectSub_ng_template_1_p_cascadeselect_sub_6_Template_p_cascadeselect_sub_onChange_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onChange.emit($event));
    })("onFocusChange", function CascadeSelectSub_ng_template_1_p_cascadeselect_sub_6_Template_p_cascadeselect_sub_onFocusChange_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onFocusChange.emit($event));
    })("onFocusEnterChange", function CascadeSelectSub_ng_template_1_p_cascadeselect_sub_6_Template_p_cascadeselect_sub_onFocusEnterChange_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onFocusEnterChange.emit($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const processedOption_r2 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("role", "group")("selectId", ctx_r2.selectId)("focusedOptionId", ctx_r2.focusedOptionId)("activeOptionPath", ctx_r2.activeOptionPath)("options", ctx_r2.getOptionGroupChildren(processedOption_r2))("optionLabel", ctx_r2.optionLabel)("optionValue", ctx_r2.optionValue)("level", ctx_r2.level + 1)("optionGroupLabel", ctx_r2.optionGroupLabel)("optionGroupChildren", ctx_r2.optionGroupChildren)("dirty", ctx_r2.dirty)("optionTemplate", ctx_r2.optionTemplate);
  }
}
function CascadeSelectSub_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 3)(1, "div", 4);
    ɵɵlistener("click", function CascadeSelectSub_ng_template_1_Template_div_click_1_listener($event) {
      const processedOption_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onOptionClick($event, processedOption_r2));
    })("mouseenter", function CascadeSelectSub_ng_template_1_Template_div_mouseenter_1_listener($event) {
      const processedOption_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onOptionMouseEnter($event, processedOption_r2));
    })("mousemove", function CascadeSelectSub_ng_template_1_Template_div_mousemove_1_listener($event) {
      const processedOption_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onOptionMouseMove($event, processedOption_r2));
    });
    ɵɵtemplate(2, CascadeSelectSub_ng_template_1_ng_container_2_Template, 2, 4, "ng-container", 5)(3, CascadeSelectSub_ng_template_1_ng_template_3_Template, 2, 2, "ng-template", null, 0, ɵɵtemplateRefExtractor)(5, CascadeSelectSub_ng_template_1_span_5_Template, 3, 3, "span", 6);
    ɵɵelementEnd();
    ɵɵtemplate(6, CascadeSelectSub_ng_template_1_p_cascadeselect_sub_6_Template, 1, 12, "p-cascadeselect-sub", 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const processedOption_r2 = ctx.$implicit;
    const i_r5 = ctx.index;
    const defaultOptionTemplate_r6 = ɵɵreference(4);
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r2.getItemClass(processedOption_r2))("id", ctx_r2.getOptionId(processedOption_r2));
    ɵɵattribute("aria-level", ctx_r2.level + 1)("aria-setsize", ctx_r2.options.length)("data-pc-section", "item")("aria-label", ctx_r2.getOptionLabelToRender(processedOption_r2))("aria-selected", ctx_r2.isOptionGroup(processedOption_r2) ? void 0 : ctx_r2.isOptionSelected(processedOption_r2))("aria-posinset", i_r5 + 1);
    ɵɵadvance();
    ɵɵattribute("data-pc-section", "content");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.optionTemplate)("ngIfElse", defaultOptionTemplate_r6);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r2.isOptionGroup(processedOption_r2));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.isOptionGroup(processedOption_r2) && ctx_r2.isOptionActive(processedOption_r2));
  }
}
var _c1 = ["value"];
var _c2 = ["option"];
var _c3 = ["header"];
var _c4 = ["footer"];
var _c5 = ["triggericon"];
var _c6 = ["loadingicon"];
var _c7 = ["optiongroupicon"];
var _c8 = ["clearicon"];
var _c9 = ["focusInput"];
var _c10 = ["container"];
var _c11 = ["panel"];
var _c12 = ["overlay"];
var _c13 = (a0, a1) => ({
  $implicit: a0,
  placeholder: a1
});
var _c14 = (a0) => ({
  "p-cascadeselect-overlay p-component": true,
  "p-cascadeselect-mobile-active": a0
});
function CascadeSelect_ng_container_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function CascadeSelect_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, CascadeSelect_ng_container_6_ng_container_1_Template, 1, 0, "ng-container", 16);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.valueTemplate || ctx_r1._valueTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c13, ctx_r1.value, ctx_r1.placeholder));
  }
}
function CascadeSelect_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵtextInterpolate1(" ", ctx_r1.label(), " ");
  }
}
function CascadeSelect_ng_container_9_TimesIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "TimesIcon", 18);
    ɵɵlistener("click", function CascadeSelect_ng_container_9_TimesIcon_1_Template_TimesIcon_click_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.clear($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "clearicon")("aria-hidden", true);
  }
}
function CascadeSelect_ng_container_9_span_2_1_ng_template_0_Template(rf, ctx) {
}
function CascadeSelect_ng_container_9_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, CascadeSelect_ng_container_9_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function CascadeSelect_ng_container_9_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 18);
    ɵɵlistener("click", function CascadeSelect_ng_container_9_span_2_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.clear($event));
    });
    ɵɵtemplate(1, CascadeSelect_ng_container_9_span_2_1_Template, 1, 0, null, 19);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵattribute("data-pc-section", "clearicon")("aria-hidden", true);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.clearIconTemplate || ctx_r1._clearIconTemplate);
  }
}
function CascadeSelect_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, CascadeSelect_ng_container_9_TimesIcon_1_Template, 1, 2, "TimesIcon", 17)(2, CascadeSelect_ng_container_9_span_2_Template, 2, 3, "span", 17);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.clearIconTemplate && !ctx_r1._clearIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.clearIconTemplate || ctx_r1._clearIconTemplate);
  }
}
function CascadeSelect_ng_container_11_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function CascadeSelect_ng_container_11_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, CascadeSelect_ng_container_11_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 19);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.loadingIconTemplate || ctx_r1._loadingIconTemplate);
  }
}
function CascadeSelect_ng_container_11_ng_container_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 22);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngClass", "p-cascadeselect-loading-icon pi-spin " + ctx_r1.loadingIcon);
  }
}
function CascadeSelect_ng_container_11_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 23);
  }
  if (rf & 2) {
    ɵɵclassMap("p-cascadeselect-loading-icon pi pi-spinner pi-spin");
  }
}
function CascadeSelect_ng_container_11_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, CascadeSelect_ng_container_11_ng_container_2_span_1_Template, 1, 1, "span", 20)(2, CascadeSelect_ng_container_11_ng_container_2_span_2_Template, 1, 2, "span", 21);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.loadingIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.loadingIcon);
  }
}
function CascadeSelect_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, CascadeSelect_ng_container_11_ng_container_1_Template, 2, 1, "ng-container", 12)(2, CascadeSelect_ng_container_11_ng_container_2_Template, 3, 2, "ng-container", 12);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.loadingIconTemplate || ctx_r1._loadingIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.loadingIconTemplate && !ctx_r1._loadingIconTemplate);
  }
}
function CascadeSelect_ng_template_12_ChevronDownIcon_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ChevronDownIcon", 26);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-cascadeselect-dropdown-icon");
  }
}
function CascadeSelect_ng_template_12_span_1_1_ng_template_0_Template(rf, ctx) {
}
function CascadeSelect_ng_template_12_span_1_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, CascadeSelect_ng_template_12_span_1_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function CascadeSelect_ng_template_12_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 27);
    ɵɵtemplate(1, CascadeSelect_ng_template_12_span_1_1_Template, 1, 0, null, 19);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.triggerIconTemplate || ctx_r1._triggerIconTemplate);
  }
}
function CascadeSelect_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, CascadeSelect_ng_template_12_ChevronDownIcon_0_Template, 1, 1, "ChevronDownIcon", 24)(1, CascadeSelect_ng_template_12_span_1_Template, 2, 1, "span", 25);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngIf", !ctx_r1.triggerIconTemplate && !ctx_r1._triggerIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.triggerIconTemplate || ctx_r1._triggerIconTemplate);
  }
}
function CascadeSelect_ng_template_18_2_ng_template_0_Template(rf, ctx) {
}
function CascadeSelect_ng_template_18_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, CascadeSelect_ng_template_18_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function CascadeSelect_ng_template_18_7_ng_template_0_Template(rf, ctx) {
}
function CascadeSelect_ng_template_18_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, CascadeSelect_ng_template_18_7_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function CascadeSelect_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 28, 6);
    ɵɵtemplate(2, CascadeSelect_ng_template_18_2_Template, 1, 0, null, 19);
    ɵɵelementStart(3, "div", 29)(4, "p-cascadeselect-sub", 30);
    ɵɵlistener("onChange", function CascadeSelect_ng_template_18_Template_p_cascadeselect_sub_onChange_4_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onOptionClick($event));
    })("onFocusChange", function CascadeSelect_ng_template_18_Template_p_cascadeselect_sub_onFocusChange_4_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onOptionMouseMove($event));
    })("onFocusEnterChange", function CascadeSelect_ng_template_18_Template_p_cascadeselect_sub_onFocusEnterChange_4_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onOptionMouseEnter($event));
    });
    ɵɵelementEnd()();
    ɵɵelementStart(5, "span", 14);
    ɵɵtext(6);
    ɵɵelementEnd();
    ɵɵtemplate(7, CascadeSelect_ng_template_18_7_Template, 1, 0, null, 19);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.panelStyleClass);
    ɵɵproperty("ngClass", ɵɵpureFunction1(24, _c14, ctx_r1.queryMatches()))("ngStyle", ctx_r1.panelStyle);
    ɵɵattribute("data-pc-section", "panel");
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headerTemplate || ctx_r1._headerTemplate);
    ɵɵadvance();
    ɵɵattribute("data-pc-section", "wrapper");
    ɵɵadvance();
    ɵɵproperty("options", ctx_r1.processedOptions)("selectId", ctx_r1.id)("focusedOptionId", ctx_r1.focused ? ctx_r1.focusedOptionId : void 0)("activeOptionPath", ctx_r1.activeOptionPath())("optionLabel", ctx_r1.optionLabel)("optionValue", ctx_r1.optionValue)("level", 0)("optionTemplate", ctx_r1.optionTemplate || ctx_r1._optionTemplate)("groupicon", ctx_r1.groupIconTemplate || ctx_r1.groupIconTemplate)("optionGroupLabel", ctx_r1.optionGroupLabel)("optionGroupChildren", ctx_r1.optionGroupChildren)("optionDisabled", ctx_r1.optionDisabled)("root", true)("dirty", ctx_r1.dirty)("role", "tree");
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ctx_r1.selectedMessageText, " ");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.footerTemplate || ctx_r1._footerTemplate);
  }
}
var CASCADESELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CascadeSelect),
  multi: true
};
var CascadeSelectSub = class _CascadeSelectSub extends BaseComponent {
  cascadeselect;
  role;
  selectId;
  activeOptionPath;
  optionDisabled;
  focusedOptionId;
  options;
  optionGroupChildren;
  optionTemplate;
  groupicon;
  level = 0;
  optionLabel;
  optionValue;
  optionGroupLabel;
  dirty;
  root;
  onChange = new EventEmitter();
  onFocusChange = new EventEmitter();
  onFocusEnterChange = new EventEmitter();
  get listLabel() {
    return this.config.getTranslation(TranslationKeys.ARIA)["listLabel"];
  }
  constructor(cascadeselect) {
    super();
    this.cascadeselect = cascadeselect;
  }
  ngOnInit() {
    super.ngOnInit();
    if (!this.root) {
      this.position();
    }
  }
  onOptionClick(event, processedOption) {
    this.onChange.emit({
      originalEvent: event,
      processedOption,
      isFocus: true
    });
  }
  onOptionMouseEnter(event, processedOption) {
    this.onFocusEnterChange.emit({
      originalEvent: event,
      processedOption
    });
  }
  onOptionMouseMove(event, processedOption) {
    this.onFocusChange.emit({
      originalEvent: event,
      processedOption
    });
  }
  getOptionId(processedOption) {
    return `${this.selectId}_${processedOption.key}`;
  }
  getOptionLabel(processedOption) {
    return this.optionLabel ? resolveFieldData(processedOption.option, this.optionLabel) : processedOption.option;
  }
  getOptionValue(processedOption) {
    return this.optionValue ? resolveFieldData(processedOption.option, this.optionValue) : processedOption.option;
  }
  getOptionLabelToRender(processedOption) {
    return this.isOptionGroup(processedOption) ? this.getOptionGroupLabel(processedOption) : this.getOptionLabel(processedOption);
  }
  isOptionDisabled(processedOption) {
    return this.optionDisabled ? resolveFieldData(processedOption.option, this.optionDisabled) : false;
  }
  getOptionGroupLabel(processedOption) {
    return this.optionGroupLabel ? resolveFieldData(processedOption.option, this.optionGroupLabel) : null;
  }
  getOptionGroupChildren(processedOption) {
    return processedOption.children;
  }
  isOptionGroup(processedOption) {
    return isNotEmpty(processedOption.children);
  }
  isOptionSelected(processedOption) {
    return equals(this.cascadeselect?.modelValue(), processedOption?.option);
  }
  isOptionActive(processedOption) {
    return this.activeOptionPath.some((path) => path.key === processedOption.key);
  }
  isOptionFocused(processedOption) {
    return this.focusedOptionId === this.getOptionId(processedOption);
  }
  getItemClass(option) {
    return {
      "p-cascadeselect-option": true,
      "p-cascadeselect-option-group": this.isOptionGroup(option),
      "p-cascadeselect-option-active": this.isOptionActive(option),
      "p-cascadeselect-option-selected": this.isOptionSelected(option),
      "p-focus": this.isOptionFocused(option),
      "p-disabled": this.isOptionDisabled(option)
    };
  }
  position() {
    const parentItem = this.el.nativeElement.parentElement;
    const containerOffset = getOffset(parentItem);
    const viewport = getViewport();
    const sublistWidth = this.el.nativeElement.children[0].offsetParent ? this.el.nativeElement.children[0].offsetWidth : getHiddenElementOuterWidth(this.el.nativeElement.children[0]);
    const itemOuterWidth = getOuterWidth(parentItem.children[0]);
    if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - calculateScrollbarWidth()) {
      this.el.nativeElement.children[0].style.left = "-200%";
    }
  }
  static ɵfac = function CascadeSelectSub_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CascadeSelectSub)(ɵɵdirectiveInject(CascadeSelect));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _CascadeSelectSub,
    selectors: [["p-cascadeSelectSub"], ["p-cascadeselect-sub"]],
    inputs: {
      role: "role",
      selectId: "selectId",
      activeOptionPath: "activeOptionPath",
      optionDisabled: "optionDisabled",
      focusedOptionId: "focusedOptionId",
      options: "options",
      optionGroupChildren: "optionGroupChildren",
      optionTemplate: "optionTemplate",
      groupicon: "groupicon",
      level: [2, "level", "level", numberAttribute],
      optionLabel: "optionLabel",
      optionValue: "optionValue",
      optionGroupLabel: "optionGroupLabel",
      dirty: [2, "dirty", "dirty", booleanAttribute],
      root: [2, "root", "root", booleanAttribute]
    },
    outputs: {
      onChange: "onChange",
      onFocusChange: "onFocusChange",
      onFocusEnterChange: "onFocusEnterChange"
    },
    standalone: true,
    features: [ɵɵInputTransformsFeature, ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
    decls: 2,
    vars: 4,
    consts: [["defaultOptionTemplate", ""], ["aria-orientation", "horizontal", 1, "p-cascadeselect-list"], ["ngFor", "", 3, "ngForOf"], ["role", "treeitem", 3, "ngClass", "id"], ["pRipple", "", 1, "p-cascadeselect-option-content", 3, "click", "mouseenter", "mousemove"], [4, "ngIf", "ngIfElse"], ["class", "p-cascadeselect-group-icon", 4, "ngIf"], ["class", "p-cascadeselect-list p-cascadeselect-overlay p-cascadeselect-option-list", 3, "role", "selectId", "focusedOptionId", "activeOptionPath", "options", "optionLabel", "optionValue", "level", "optionGroupLabel", "optionGroupChildren", "dirty", "optionTemplate", "onChange", "onFocusChange", "onFocusEnterChange", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-cascadeselect-option-text"], [1, "p-cascadeselect-group-icon"], [4, "ngIf"], [4, "ngTemplateOutlet"], [1, "p-cascadeselect-list", "p-cascadeselect-overlay", "p-cascadeselect-option-list", 3, "onChange", "onFocusChange", "onFocusEnterChange", "role", "selectId", "focusedOptionId", "activeOptionPath", "options", "optionLabel", "optionValue", "level", "optionGroupLabel", "optionGroupChildren", "dirty", "optionTemplate"]],
    template: function CascadeSelectSub_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "ul", 1);
        ɵɵtemplate(1, CascadeSelectSub_ng_template_1_Template, 7, 13, "ng-template", 2);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵattribute("role", ctx.role)("data-pc-section", ctx.level === 0 ? "list" : "sublist")("aria-label", ctx.listLabel);
        ɵɵadvance();
        ɵɵproperty("ngForOf", ctx.options);
      }
    },
    dependencies: [_CascadeSelectSub, CommonModule, NgClass, NgForOf, NgIf, NgTemplateOutlet, Ripple, AngleRightIcon, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CascadeSelectSub, [{
    type: Component,
    args: [{
      selector: "p-cascadeSelectSub, p-cascadeselect-sub",
      standalone: true,
      imports: [CommonModule, Ripple, AngleRightIcon, SharedModule],
      template: `
        <ul class="p-cascadeselect-list" [attr.role]="role" aria-orientation="horizontal" [attr.data-pc-section]="level === 0 ? 'list' : 'sublist'" [attr.aria-label]="listLabel">
            <ng-template ngFor let-processedOption [ngForOf]="options" let-i="index">
                <li
                    [ngClass]="getItemClass(processedOption)"
                    role="treeitem"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="options.length"
                    [attr.data-pc-section]="'item'"
                    [id]="getOptionId(processedOption)"
                    [attr.aria-label]="getOptionLabelToRender(processedOption)"
                    [attr.aria-selected]="isOptionGroup(processedOption) ? undefined : isOptionSelected(processedOption)"
                    [attr.aria-posinset]="i + 1"
                >
                    <div
                        class="p-cascadeselect-option-content"
                        (click)="onOptionClick($event, processedOption)"
                        (mouseenter)="onOptionMouseEnter($event, processedOption)"
                        (mousemove)="onOptionMouseMove($event, processedOption)"
                        pRipple
                        [attr.data-pc-section]="'content'"
                    >
                        <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
                            <ng-container *ngTemplateOutlet="optionTemplate; context: { $implicit: processedOption?.option }"></ng-container>
                        </ng-container>
                        <ng-template #defaultOptionTemplate>
                            <span class="p-cascadeselect-option-text" [attr.data-pc-section]="'text'">{{ getOptionLabelToRender(processedOption) }}</span>
                        </ng-template>
                        <span class="p-cascadeselect-group-icon" *ngIf="isOptionGroup(processedOption)" [attr.data-pc-section]="'groupIcon'">
                            <AngleRightIcon *ngIf="!groupicon" />
                            <ng-template *ngTemplateOutlet="groupicon"></ng-template>
                        </span>
                    </div>
                    <p-cascadeselect-sub
                        *ngIf="isOptionGroup(processedOption) && isOptionActive(processedOption)"
                        [role]="'group'"
                        class="p-cascadeselect-list p-cascadeselect-overlay p-cascadeselect-option-list"
                        [selectId]="selectId"
                        [focusedOptionId]="focusedOptionId"
                        [activeOptionPath]="activeOptionPath"
                        [options]="getOptionGroupChildren(processedOption)"
                        [optionLabel]="optionLabel"
                        [optionValue]="optionValue"
                        [level]="level + 1"
                        (onChange)="onChange.emit($event)"
                        (onFocusChange)="onFocusChange.emit($event)"
                        (onFocusEnterChange)="onFocusEnterChange.emit($event)"
                        [optionGroupLabel]="optionGroupLabel"
                        [optionGroupChildren]="optionGroupChildren"
                        [dirty]="dirty"
                        [optionTemplate]="optionTemplate"
                    >
                    </p-cascadeselect-sub>
                </li>
            </ng-template>
        </ul>
    `,
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], () => [{
    type: CascadeSelect
  }], {
    role: [{
      type: Input
    }],
    selectId: [{
      type: Input
    }],
    activeOptionPath: [{
      type: Input
    }],
    optionDisabled: [{
      type: Input
    }],
    focusedOptionId: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    optionGroupChildren: [{
      type: Input
    }],
    optionTemplate: [{
      type: Input
    }],
    groupicon: [{
      type: Input
    }],
    level: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    optionLabel: [{
      type: Input
    }],
    optionValue: [{
      type: Input
    }],
    optionGroupLabel: [{
      type: Input
    }],
    dirty: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    root: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onChange: [{
      type: Output
    }],
    onFocusChange: [{
      type: Output
    }],
    onFocusEnterChange: [{
      type: Output
    }]
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassDebugInfo(CascadeSelectSub, {
    className: "CascadeSelectSub"
  });
})();
var CascadeSelect = class _CascadeSelect extends BaseComponent {
  overlayService;
  /**
   * Unique identifier of the component
   * @group Props
   */
  id;
  /**
   * Text to display when the search is active. Defaults to global value in i18n translation configuration.
   * @group Props
   * @defaultValue '{0} results are available'
   */
  searchMessage;
  /**
   * Text to display when there is no data. Defaults to global value in i18n translation configuration.
   * @group Props
   */
  emptyMessage;
  /**
   * Text to be displayed in hidden accessible field when options are selected. Defaults to global value in i18n translation configuration.
   * @group Props
   * @defaultValue '{0} items selected'
   */
  selectionMessage;
  /**
   * Text to display when filtering does not return any results. Defaults to value from PrimeNG locale configuration.
   * @group Props
   * @defaultValue 'No available options'
   */
  emptySearchMessage;
  /**
   * Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.
   * @group Props
   * @defaultValue 'No selected item'
   */
  emptySelectionMessage;
  /**
   * Locale to use in searching. The default locale is the host environment's current locale.
   * @group Props
   */
  searchLocale;
  /**
   * Name of the disabled field of an option.
   * @group Props
   */
  optionDisabled;
  /**
   * Fields used when filtering the options, defaults to optionLabel.
   * @group Props
   */
  focusOnHover = true;
  /**
   * Determines if the option will be selected on focus.
   * @group Props
   */
  selectOnFocus = false;
  /**
   * Whether to focus on the first visible or selected element when the overlay panel is shown.
   * @group Props
   */
  autoOptionFocus = false;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * An array of selectitems to display as the available options.
   * @group Props
   */
  options;
  /**
   * Property name or getter function to use as the label of an option.
   * @group Props
   */
  optionLabel;
  /**
   * Property name or getter function to use as the value of an option, defaults to the option itself when not defined.
   * @group Props
   */
  optionValue;
  /**
   * Property name or getter function to use as the label of an option group.
   * @group Props
   */
  optionGroupLabel;
  /**
   * Property name or getter function to retrieve the items of a group.
   * @group Props
   */
  optionGroupChildren;
  /**
   * Default text to display when no option is selected.
   * @group Props
   */
  placeholder;
  /**
   * Selected value of the component.
   * @group Props
   */
  value;
  /**
   * A property to uniquely identify an option.
   * @group Props
   */
  dataKey;
  /**
   * Identifier of the underlying input element.
   * @group Props
   */
  inputId;
  /**
   * Defines the size of the component.
   * @group Props
   */
  size;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = 0;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Label of the input for accessibility.
   * @group Props
   */
  inputLabel;
  /**
   * Defines a string that labels the input for accessibility.
   * @group Props
   */
  ariaLabel;
  /**
   * Id of the element or "body" for document where the overlay should be appended to.
   * @group Props
   */
  appendTo;
  /**
   * When present, it specifies that the component should be disabled.
   * @group Props
   */
  disabled;
  /**
   * When enabled, a clear icon is displayed to clear the value.
   * @group Props
   */
  showClear = false;
  /**
   * Style class of the overlay panel.
   * @group Props
   */
  panelStyleClass;
  /**
   * Inline style of the overlay panel.
   * @group Props
   */
  panelStyle;
  /**
   * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
   * @group Props
   */
  overlayOptions;
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus;
  /**
   * Transition options of the show animation.
   * @group Props
   * @deprecated deprecated since v14.2.0, use overlayOptions property instead.
   */
  get showTransitionOptions() {
    return this._showTransitionOptions;
  }
  set showTransitionOptions(val) {
    this._showTransitionOptions = val;
    console.log("The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  /**
   * Specifies the input variant of the component.
   * @group Props
   */
  variant = "outlined";
  /**
   * Whether the dropdown is in loading state.
   * @group Props
   */
  loading = false;
  /**
   * Icon to display in loading state.
   * @group Props
   */
  loadingIcon;
  /**
   * Transition options of the hide animation.
   * @group Props
   * @deprecated deprecated since v14.2.0, use overlayOptions property instead.
   */
  get hideTransitionOptions() {
    return this._hideTransitionOptions;
  }
  set hideTransitionOptions(val) {
    this._hideTransitionOptions = val;
    console.log("The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  /**
   * Spans 100% width of the container when enabled.
   * @group Props
   */
  fluid = false;
  /**
   * The breakpoint to define the maximum width boundary.
   * @group Props
   */
  breakpoint = "960px";
  /**
   * Callback to invoke on value change.
   * @param {CascadeSelectChangeEvent} event - Custom change event.
   * @group Emits
   */
  onChange = new EventEmitter();
  /**
   * Callback to invoke when a group changes.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onGroupChange = new EventEmitter();
  /**
   * Callback to invoke when the overlay is shown.
   * @param {CascadeSelectShowEvent} event - Custom overlay show event.
   * @group Emits
   */
  onShow = new EventEmitter();
  /**
   * Callback to invoke when the overlay is hidden.
   * @param {CascadeSelectHideEvent} event - Custom overlay hide event.
   * @group Emits
   */
  onHide = new EventEmitter();
  /**
   * Callback to invoke when the clear token is clicked.
   * @group Emits
   */
  onClear = new EventEmitter();
  /**
   * Callback to invoke before overlay is shown.
   * @param {CascadeSelectBeforeShowEvent} event - Custom overlay show event.
   * @group Emits
   */
  onBeforeShow = new EventEmitter();
  /**
   * Callback to invoke before overlay is hidden.
   * @param {CascadeSelectBeforeHideEvent} event - Custom overlay hide event.
   * @group Emits
   */
  onBeforeHide = new EventEmitter();
  /**
   * Callback to invoke when input receives focus.
   * @param {FocusEvent} event - Focus event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when input loses focus.
   * @param {FocusEvent} event - Focus event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  focusInputViewChild;
  containerViewChild;
  panelViewChild;
  overlayViewChild;
  /**
   * Content template for displaying the selected value.
   * @group Templates
   */
  valueTemplate;
  /**
   * Content template for customizing the option display.
   * @group Templates
   */
  optionTemplate;
  /**
   * Content template for customizing the header.
   * @group Templates
   */
  headerTemplate;
  /**
   * Content template for customizing the footer.
   * @group Templates
   */
  footerTemplate;
  /**
   * Content template for customizing the trigger icon.
   * @group Templates
   */
  triggerIconTemplate;
  /**
   * Content template for customizing the loading icon.
   * @group Templates
   */
  loadingIconTemplate;
  /**
   * Content template for customizing the group icon.
   * @group Templates
   */
  groupIconTemplate;
  /**
   * Content template for customizing the clear icon.
   * @group Templates
   */
  clearIconTemplate;
  _valueTemplate;
  _optionTemplate;
  _headerTemplate;
  _footerTemplate;
  _triggerIconTemplate;
  _loadingIconTemplate;
  _groupIconTemplate;
  _clearIconTemplate;
  _showTransitionOptions = "";
  _hideTransitionOptions = "";
  selectionPath = null;
  focused = false;
  overlayVisible = false;
  clicked = false;
  dirty = false;
  searchValue;
  searchTimeout;
  onModelChange = () => {
  };
  onModelTouched = () => {
  };
  focusedOptionInfo = signal({
    index: -1,
    level: 0,
    parentKey: ""
  });
  activeOptionPath = signal([]);
  modelValue = signal(null);
  processedOptions = [];
  _componentStyle = inject(CascadeSelectStyle);
  get containerClass() {
    return {
      "p-cascadeselect p-component p-inputwrapper": true,
      "p-cascadeselect-clearable": this.showClear && !this.disabled,
      "p-cascadeselect-mobile": this.queryMatches(),
      "p-disabled": this.disabled,
      "p-focus": this.focused,
      "p-inputwrapper-filled": this.modelValue(),
      "p-variant-filled": this.variant === "filled" || this.config.inputStyle() === "filled" || this.config.inputVariant() === "filled",
      "p-inputwrapper-focus": this.focused || this.overlayVisible,
      "p-cascadeselect-open": this.overlayVisible,
      "p-cascadeselect-fluid": this.hasFluid,
      "p-cascadeselect-sm p-inputfield-sm": this.size === "small",
      "p-cascadeselect-lg p-inputfield-lg": this.size === "large"
    };
  }
  get labelClass() {
    return {
      "p-cascadeselect-label": true,
      "p-placeholder": this.label() === this.placeholder,
      "p-cascadeselect-label-empty": !this.value && (this.label() === "p-emptylabel" || this.label().length === 0)
    };
  }
  get hasFluid() {
    const nativeElement = this.el.nativeElement;
    const fluidComponent = nativeElement.closest("p-fluid");
    return this.fluid || !!fluidComponent;
  }
  get focusedOptionId() {
    return this.focusedOptionInfo().index !== -1 ? `${this.id}${isNotEmpty(this.focusedOptionInfo().parentKey) ? "_" + this.focusedOptionInfo().parentKey : ""}_${this.focusedOptionInfo().index}` : null;
  }
  get filled() {
    if (typeof this.modelValue() === "string") return !!this.modelValue();
    return this.modelValue() || this.modelValue() != null || this.modelValue() != void 0;
  }
  get searchResultMessageText() {
    return isNotEmpty(this.visibleOptions()) ? this.searchMessageText.replaceAll("{0}", this.visibleOptions().length) : this.emptySearchMessageText;
  }
  get searchMessageText() {
    return this.searchMessage || this.config.translation.searchMessage || "";
  }
  get emptySearchMessageText() {
    return this.emptySearchMessage || this.config.translation.emptySearchMessage || "";
  }
  get emptyMessageText() {
    return this.emptyMessage || this.config.translation.emptyMessage || "";
  }
  get selectionMessageText() {
    return this.selectionMessage || this.config.translation.selectionMessage || "";
  }
  get emptySelectionMessageText() {
    return this.emptySelectionMessage || this.config.translation.emptySelectionMessage || "";
  }
  get selectedMessageText() {
    return this.hasSelectedOption ? this.selectionMessageText.replaceAll("{0}", "1") : this.emptySelectionMessageText;
  }
  visibleOptions = computed(() => {
    const processedOption = this.activeOptionPath().find((p) => p.key === this.focusedOptionInfo().parentKey);
    return processedOption ? processedOption.children : this.processedOptions;
  });
  label = computed(() => {
    const label = this.placeholder || "p-emptylabel";
    if (this.hasSelectedOption()) {
      const activeOptionPath = this.findOptionPathByValue(this.modelValue(), null);
      const processedOption = isNotEmpty(activeOptionPath) ? activeOptionPath[activeOptionPath.length - 1] : null;
      return processedOption ? this.getOptionLabel(processedOption.option) : label;
    }
    return label;
  });
  get _label() {
    const label = this.placeholder || "p-emptylabel";
    if (this.hasSelectedOption()) {
      const activeOptionPath = this.findOptionPathByValue(this.modelValue(), null);
      const processedOption = isNotEmpty(activeOptionPath) ? activeOptionPath[activeOptionPath.length - 1] : null;
      return processedOption ? this.getOptionLabel(processedOption.option) : label;
    }
    return label;
  }
  templates;
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "value":
          this._valueTemplate = item.template;
          break;
        case "option":
          this._optionTemplate = item.template;
          break;
        case "triggericon":
          this._triggerIconTemplate = item.template;
          break;
        case "loadingicon":
          this._loadingIconTemplate = item.template;
          break;
        case "clearicon":
          this._clearIconTemplate = item.template;
          break;
        case "optiongroupicon":
          this._groupIconTemplate = item.template;
          break;
      }
    });
  }
  ngOnChanges(changes) {
    super.ngOnChanges(changes);
    if (changes.options) {
      this.processedOptions = this.createProcessedOptions(changes.options.currentValue || []);
      this.updateModel(null);
    }
  }
  hasSelectedOption() {
    return isNotEmpty(this.modelValue());
  }
  createProcessedOptions(options, level = 0, parent = {}, parentKey = "") {
    const processedOptions = [];
    options && options.forEach((option, index) => {
      const key = (parentKey !== "" ? parentKey + "_" : "") + index;
      const newOption = {
        option,
        index,
        level,
        key,
        parent,
        parentKey
      };
      newOption["children"] = this.createProcessedOptions(this.getOptionGroupChildren(option, level), level + 1, newOption, key);
      processedOptions.push(newOption);
    });
    return processedOptions;
  }
  onInputFocus(event) {
    if (this.disabled) {
      return;
    }
    this.focused = true;
    this.onFocus.emit(event);
  }
  onInputBlur(event) {
    this.focused = false;
    this.focusedOptionInfo.set({
      indeX: -1,
      level: 0,
      parentKey: ""
    });
    this.searchValue = "";
    this.onModelTouched();
    this.onBlur.emit(event);
  }
  onInputKeyDown(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }
    const metaKey = event.metaKey || event.ctrlKey;
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event);
        break;
      case "ArrowLeft":
        this.onArrowLeftKey(event);
        break;
      case "ArrowRight":
        this.onArrowRightKey(event);
        break;
      case "Home":
        this.onHomeKey(event);
        break;
      case "End":
        this.onEndKey(event);
        break;
      case "Space":
        this.onSpaceKey(event);
        break;
      case "Enter":
      case "NumpadEnter":
        this.onEnterKey(event);
        break;
      case "Escape":
        this.onEscapeKey(event);
        break;
      case "Tab":
        this.onTabKey(event);
        break;
      case "Backspace":
        this.onBackspaceKey(event);
        break;
      case "PageDown":
      case "PageUp":
      case "ShiftLeft":
      case "ShiftRight":
        break;
      default:
        if (!metaKey && isPrintableCharacter(event.key)) {
          !this.overlayVisible && this.show();
          this.searchOptions(event, event.key);
        }
        break;
    }
    this.clicked = false;
  }
  onArrowDownKey(event) {
    if (!this.overlayVisible) {
      this.show();
    } else {
      const optionIndex = this.focusedOptionInfo().index !== -1 ? this.findNextOptionIndex(this.focusedOptionInfo().index) : this.clicked ? this.findFirstOptionIndex() : this.findFirstFocusedOptionIndex();
      this.changeFocusedOptionIndex(event, optionIndex, true);
    }
    event.preventDefault();
  }
  onArrowUpKey(event) {
    if (event.altKey) {
      if (this.focusedOptionInfo().index !== -1) {
        const processedOption = this.visibleOptions[this.focusedOptionInfo().index];
        const grouped = this.isProccessedOptionGroup(processedOption);
        !grouped && this.onOptionChange({
          originalEvent: event,
          processedOption
        });
      }
      this.overlayVisible && this.hide();
      event.preventDefault();
    } else {
      const optionIndex = this.focusedOptionInfo().index !== -1 ? this.findPrevOptionIndex(this.focusedOptionInfo().index) : this.clicked ? this.findLastOptionIndex() : this.findLastFocusedOptionIndex();
      this.changeFocusedOptionIndex(event, optionIndex, true);
      !this.overlayVisible && this.show();
      event.preventDefault();
    }
  }
  onArrowLeftKey(event) {
    if (this.overlayVisible) {
      const processedOption = this.visibleOptions()[this.focusedOptionInfo().index];
      const parentOption = this.activeOptionPath().find((p) => p.key === processedOption.parentKey);
      const matched = this.focusedOptionInfo().parentKey === "" || parentOption && parentOption.key === this.focusedOptionInfo().parentKey;
      const root = isEmpty(processedOption.parent);
      if (matched) {
        const activeOptionPath = this.activeOptionPath().filter((p) => p.parentKey !== this.focusedOptionInfo().parentKey);
        this.activeOptionPath.set(activeOptionPath);
      }
      if (!root) {
        this.focusedOptionInfo.set({
          index: -1,
          parentKey: parentOption ? parentOption.parentKey : ""
        });
        this.searchValue = "";
        this.onArrowDownKey(event);
      }
      event.preventDefault();
    }
  }
  onArrowRightKey(event) {
    if (this.overlayVisible) {
      const processedOption = this.visibleOptions()[this.focusedOptionInfo().index];
      const grouped = this.isProccessedOptionGroup(processedOption);
      if (grouped) {
        const matched = this.activeOptionPath().some((p) => processedOption.key === p.key);
        if (matched) {
          this.focusedOptionInfo.set({
            index: -1,
            parentKey: processedOption.key
          });
          this.searchValue = "";
          this.onArrowDownKey(event);
        } else {
          this.onOptionChange({
            originalEvent: event,
            processedOption
          });
        }
      }
      event.preventDefault();
    }
  }
  onHomeKey(event) {
    this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());
    !this.overlayVisible && this.show();
    event.preventDefault();
  }
  onEndKey(event) {
    this.changeFocusedOptionIndex(event, this.findLastOptionIndex());
    !this.overlayVisible && this.show();
    event.preventDefault();
  }
  onEnterKey(event) {
    if (!this.overlayVisible) {
      this.focusedOptionInfo.set(__spreadProps(__spreadValues({}, this.focusedOptionInfo()), {
        index: -1
      }));
      this.onArrowDownKey(event);
    } else {
      if (this.focusedOptionInfo().index !== -1) {
        const processedOption = this.visibleOptions()[this.focusedOptionInfo().index];
        const grouped = this.isProccessedOptionGroup(processedOption);
        this.onOptionClick({
          originalEvent: event,
          processedOption
        });
        !grouped && this.hide();
      }
    }
    event.preventDefault();
  }
  onSpaceKey(event) {
    this.onEnterKey(event);
  }
  onEscapeKey(event) {
    this.overlayVisible && this.hide(event, true);
    event.preventDefault();
  }
  onTabKey(event) {
    if (this.focusedOptionInfo().index !== -1) {
      const processedOption = this.visibleOptions()[this.focusedOptionInfo().index];
      const grouped = this.isProccessedOptionGroup(processedOption);
      !grouped && this.onOptionChange({
        originalEvent: event,
        processedOption
      });
    }
    this.overlayVisible && this.hide();
  }
  onBackspaceKey(event) {
    if (isNotEmpty(this.modelValue()) && this.showClear) {
      this.clear();
    }
    event.stopPropagation();
  }
  equalityKey() {
    return this.optionValue ? null : this.dataKey;
  }
  updateModel(value, event) {
    this.value = value;
    this.onModelChange(value);
    this.modelValue.set(value);
    this.onChange.emit({
      originalEvent: event,
      value
    });
  }
  autoUpdateModel() {
    if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption()) {
      this.focusedOptionInfo().index = this.findFirstFocusedOptionIndex();
      this.onOptionChange({
        originalEvent: null,
        processedOption: this.visibleOptions()[this.focusedOptionInfo().index],
        isHide: false
      });
      !this.overlayVisible && this.focusedOptionInfo.set({
        index: -1,
        level: 0,
        parentKey: ""
      });
    }
  }
  scrollInView(index = -1) {
    const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
    const element = findSingle(this.panelViewChild?.nativeElement, `li[id="${id}"]`);
    if (element) {
      element.scrollIntoView && element.scrollIntoView({
        block: "nearest",
        inline: "start"
      });
    }
  }
  changeFocusedOptionIndex(event, index, preventSelection) {
    const focusedOptionInfo = this.focusedOptionInfo();
    if (focusedOptionInfo.index !== index) {
      this.focusedOptionInfo.set(__spreadProps(__spreadValues({}, focusedOptionInfo), {
        index
      }));
      this.scrollInView();
      if (this.focusOnHover) {
        this.onOptionClick({
          originalEvent: event,
          processedOption: this.visibleOptions()[index],
          isHide: false,
          preventSelection
        });
      }
      if (this.selectOnFocus) {
        this.onOptionChange({
          originalEvent: event,
          processedOption: this.visibleOptions()[index],
          isHide: false
        });
      }
    }
  }
  matchMediaListener;
  onOptionSelect(event) {
    const {
      originalEvent,
      value,
      isHide
    } = event;
    const newValue = this.getOptionValue(value);
    const activeOptionPath = this.activeOptionPath();
    activeOptionPath.forEach((p) => p.selected = true);
    this.activeOptionPath.set(activeOptionPath);
    this.updateModel(newValue, originalEvent);
    isHide && this.hide(event, true);
  }
  onOptionGroupSelect(event) {
    this.dirty = true;
    this.onGroupChange.emit(event);
  }
  onContainerClick(event) {
    if (this.disabled || this.loading) {
      return;
    }
    if (!this.overlayViewChild?.el?.nativeElement?.contains(event.target)) {
      if (this.overlayVisible) {
        this.hide();
      } else {
        this.show();
      }
      this.focusInputViewChild?.nativeElement.focus();
    }
    this.clicked = true;
  }
  isOptionMatched(processedOption) {
    return this.isValidOption(processedOption) && this.getProccessedOptionLabel(processedOption).toLocaleLowerCase(this.searchLocale).startsWith(this.searchValue.toLocaleLowerCase(this.searchLocale));
  }
  isOptionDisabled(option) {
    return this.optionDisabled ? resolveFieldData(option, this.optionDisabled) : false;
  }
  isValidOption(processedOption) {
    return !!processedOption && !this.isOptionDisabled(processedOption.option);
  }
  isValidSelectedOption(processedOption) {
    return this.isValidOption(processedOption) && this.isSelected(processedOption);
  }
  isSelected(processedOption) {
    return this.activeOptionPath().some((p) => p.key === processedOption.key);
  }
  findOptionPathByValue(value, processedOptions, level = 0) {
    processedOptions = processedOptions || level === 0 && this.processedOptions;
    if (!processedOptions) return null;
    if (isEmpty(value)) return [];
    for (let i = 0; i < processedOptions.length; i++) {
      const processedOption = processedOptions[i];
      if (equals(value, this.getOptionValue(processedOption.option), this.equalityKey())) {
        return [processedOption];
      }
      const matchedOptions = this.findOptionPathByValue(value, processedOption.children, level + 1);
      if (matchedOptions) {
        matchedOptions.unshift(processedOption);
        return matchedOptions;
      }
    }
  }
  findFirstOptionIndex() {
    return this.visibleOptions().findIndex((processedOption) => this.isValidOption(processedOption));
  }
  findLastOptionIndex() {
    return findLastIndex(this.visibleOptions(), (processedOption) => this.isValidOption(processedOption));
  }
  findNextOptionIndex(index) {
    const matchedOptionIndex = index < this.visibleOptions().length - 1 ? this.visibleOptions().slice(index + 1).findIndex((processedOption) => this.isValidOption(processedOption)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
  }
  findPrevOptionIndex(index) {
    const matchedOptionIndex = index > 0 ? findLastIndex(this.visibleOptions().slice(0, index), (processedOption) => this.isValidOption(processedOption)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  }
  findSelectedOptionIndex() {
    return this.visibleOptions().findIndex((processedOption) => this.isValidSelectedOption(processedOption));
  }
  findFirstFocusedOptionIndex() {
    const selectedIndex = this.findSelectedOptionIndex();
    return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
  }
  findLastFocusedOptionIndex() {
    const selectedIndex = this.findSelectedOptionIndex();
    return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
  }
  searchOptions(event, char) {
    this.searchValue = (this.searchValue || "") + char;
    let optionIndex = -1;
    let matched = false;
    const focusedOptionInfo = this.focusedOptionInfo();
    if (focusedOptionInfo.index !== -1) {
      optionIndex = this.visibleOptions().slice(focusedOptionInfo.index).findIndex((processedOption) => this.isOptionMatched(processedOption));
      optionIndex = optionIndex === -1 ? this.visibleOptions().slice(0, focusedOptionInfo.index).findIndex((processedOption) => this.isOptionMatched(processedOption)) : optionIndex + focusedOptionInfo.index;
    } else {
      optionIndex = this.visibleOptions().findIndex((processedOption) => this.isOptionMatched(processedOption));
    }
    if (optionIndex !== -1) {
      matched = true;
    }
    if (optionIndex === -1 && focusedOptionInfo.index === -1) {
      optionIndex = this.findFirstFocusedOptionIndex();
    }
    if (optionIndex !== -1) {
      this.changeFocusedOptionIndex(event, optionIndex);
    }
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.searchValue = "";
      this.searchTimeout = null;
    }, 500);
    return matched;
  }
  hide(event, isFocus = false) {
    const _hide = () => {
      this.overlayVisible = false;
      this.clicked = false;
      this.activeOptionPath.set([]);
      this.focusedOptionInfo.set({
        index: -1,
        level: 0,
        parentKey: ""
      });
      isFocus && focus(this.focusInputViewChild.nativeElement);
      this.onHide.emit(event);
      this.cd.markForCheck();
    };
    setTimeout(() => {
      _hide();
    }, 0);
  }
  show(event, isFocus = false) {
    this.onShow.emit(event);
    this.overlayVisible = true;
    const activeOptionPath = this.hasSelectedOption() ? this.findOptionPathByValue(this.modelValue()) : this.activeOptionPath();
    this.activeOptionPath.set(activeOptionPath);
    let focusedOptionInfo;
    if (this.hasSelectedOption() && isNotEmpty(this.activeOptionPath())) {
      const processedOption = this.activeOptionPath()[this.activeOptionPath().length - 1];
      focusedOptionInfo = {
        index: processedOption.index,
        level: processedOption.level,
        parentKey: processedOption.parentKey
      };
    } else {
      focusedOptionInfo = {
        index: this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.findSelectedOptionIndex(),
        level: 0,
        parentKey: ""
      };
    }
    this.focusedOptionInfo.set(focusedOptionInfo);
    isFocus && focus(this.focusInputViewChild.nativeElement);
  }
  clear(event) {
    if (isNotEmpty(this.modelValue()) && this.showClear) {
      this.updateModel(null);
      this.focusedOptionInfo.set({
        index: -1,
        level: 0,
        parentKey: ""
      });
      this.activeOptionPath.set([]);
      this.onClear.emit();
    }
    event && event.stopPropagation();
  }
  getOptionLabel(option) {
    return this.optionLabel ? resolveFieldData(option, this.optionLabel) : option;
  }
  getOptionValue(option) {
    return this.optionValue ? resolveFieldData(option, this.optionValue) : option;
  }
  getOptionGroupLabel(optionGroup) {
    return this.optionGroupLabel ? resolveFieldData(optionGroup, this.optionGroupLabel) : null;
  }
  getOptionGroupChildren(optionGroup, level) {
    return resolveFieldData(optionGroup, this.optionGroupChildren[level]);
  }
  isOptionGroup(option, level) {
    return Object.prototype.hasOwnProperty.call(option, this.optionGroupChildren[level]);
  }
  isProccessedOptionGroup(processedOption) {
    return isNotEmpty(processedOption?.children);
  }
  getProccessedOptionLabel(processedOption) {
    const grouped = this.isProccessedOptionGroup(processedOption);
    return grouped ? this.getOptionGroupLabel(processedOption.option) : this.getOptionLabel(processedOption.option);
  }
  constructor(overlayService) {
    super();
    this.overlayService = overlayService;
    effect(() => {
      const activeOptionPath = this.activeOptionPath();
      if (isNotEmpty(activeOptionPath)) {
        this.overlayViewChild.alignOverlay();
      }
    });
  }
  query;
  queryMatches = signal(false);
  mobileActive = signal(false);
  onOptionChange(event) {
    const {
      processedOption,
      type
    } = event;
    if (isEmpty(processedOption)) return;
    const {
      index,
      key,
      level,
      parentKey,
      children
    } = processedOption;
    const grouped = isNotEmpty(children);
    const activeOptionPath = this.activeOptionPath().filter((p) => p.parentKey !== parentKey && p.parentKey !== key);
    this.focusedOptionInfo.set({
      index,
      level,
      parentKey
    });
    if (type == "hover" && this.queryMatches()) {
      return;
    }
    if (grouped) {
      activeOptionPath.push(processedOption);
    }
    this.activeOptionPath.set([...activeOptionPath]);
  }
  onOptionClick(event) {
    const {
      originalEvent,
      processedOption,
      isFocus,
      isHide,
      preventSelection
    } = event;
    const {
      index,
      key,
      level,
      parentKey
    } = processedOption;
    const grouped = this.isProccessedOptionGroup(processedOption);
    const selected = this.isSelected(processedOption);
    if (selected) {
      const activeOptionPath = this.activeOptionPath().filter((p) => key !== p.key && key.startsWith(p.key));
      this.activeOptionPath.set([...activeOptionPath]);
      this.focusedOptionInfo.set({
        index,
        level,
        parentKey
      });
    } else {
      if (grouped) {
        this.onOptionChange(event);
        this.onOptionGroupSelect({
          originalEvent,
          value: processedOption.option,
          isFocus: false
        });
      } else {
        const activeOptionPath = this.activeOptionPath().filter((p) => p.parentKey !== parentKey);
        activeOptionPath.push(processedOption);
        this.focusedOptionInfo.set({
          index,
          level,
          parentKey
        });
        if (!preventSelection || processedOption?.children.length !== 0) {
          this.activeOptionPath.set([...activeOptionPath]);
          this.onOptionSelect({
            originalEvent,
            value: processedOption.option,
            isHide: isFocus
          });
        }
      }
    }
    isFocus && focus(this.focusInputViewChild.nativeElement);
  }
  onOptionMouseEnter(event) {
    if (this.focusOnHover) {
      if (this.dirty || !this.dirty && isNotEmpty(this.modelValue())) {
        this.onOptionChange(__spreadProps(__spreadValues({}, event), {
          type: "hover"
        }));
      } else if (!this.dirty && event.processedOption.level === 0) {
        this.onOptionClick(__spreadProps(__spreadValues({}, event), {
          type: "hover"
        }));
      }
    }
  }
  onOptionMouseMove(event) {
    if (this.focused && this.focusOnHover) {
      this.changeFocusedOptionIndex(event, event.processedOption.index);
    }
  }
  ngOnInit() {
    super.ngOnInit();
    this.id = this.id || uuid("pn_id_");
    this.autoUpdateModel();
    this.bindMatchMediaListener();
  }
  bindMatchMediaListener() {
    if (!this.matchMediaListener) {
      const window = this.document.defaultView;
      if (window && window.matchMedia) {
        const query = window.matchMedia(`(max-width: ${this.breakpoint})`);
        this.query = query;
        this.queryMatches.set(query?.matches);
        this.matchMediaListener = () => {
          this.queryMatches.set(query?.matches);
          this.mobileActive.set(false);
        };
        this.query.addEventListener("change", this.matchMediaListener);
      }
    }
  }
  unbindMatchMediaListener() {
    if (this.matchMediaListener) {
      this.query.removeEventListener("change", this.matchMediaListener);
      this.matchMediaListener = null;
    }
  }
  onOverlayAnimationDone(event) {
    switch (event.toState) {
      case "void":
        this.dirty = false;
        break;
    }
  }
  writeValue(value) {
    this.value = value;
    this.updateModel(value);
    this.cd.markForCheck();
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  setDisabledState(val) {
    this.disabled = val;
    this.cd.markForCheck();
  }
  ngOnDestroy() {
    if (this.matchMediaListener) {
      this.unbindMatchMediaListener();
    }
  }
  static ɵfac = function CascadeSelect_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CascadeSelect)(ɵɵdirectiveInject(OverlayService));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _CascadeSelect,
    selectors: [["p-cascadeSelect"], ["p-cascadeselect"], ["p-cascade-select"]],
    contentQueries: function CascadeSelect_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c1, 4);
        ɵɵcontentQuery(dirIndex, _c2, 4);
        ɵɵcontentQuery(dirIndex, _c3, 4);
        ɵɵcontentQuery(dirIndex, _c4, 4);
        ɵɵcontentQuery(dirIndex, _c5, 4);
        ɵɵcontentQuery(dirIndex, _c6, 4);
        ɵɵcontentQuery(dirIndex, _c7, 4);
        ɵɵcontentQuery(dirIndex, _c8, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.valueTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.optionTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.triggerIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.loadingIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.groupIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clearIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function CascadeSelect_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c9, 5);
        ɵɵviewQuery(_c10, 5);
        ɵɵviewQuery(_c11, 5);
        ɵɵviewQuery(_c12, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.focusInputViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.containerViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.panelViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.overlayViewChild = _t.first);
      }
    },
    inputs: {
      id: "id",
      searchMessage: "searchMessage",
      emptyMessage: "emptyMessage",
      selectionMessage: "selectionMessage",
      emptySearchMessage: "emptySearchMessage",
      emptySelectionMessage: "emptySelectionMessage",
      searchLocale: "searchLocale",
      optionDisabled: "optionDisabled",
      focusOnHover: [2, "focusOnHover", "focusOnHover", booleanAttribute],
      selectOnFocus: [2, "selectOnFocus", "selectOnFocus", booleanAttribute],
      autoOptionFocus: [2, "autoOptionFocus", "autoOptionFocus", booleanAttribute],
      styleClass: "styleClass",
      style: "style",
      options: "options",
      optionLabel: "optionLabel",
      optionValue: "optionValue",
      optionGroupLabel: "optionGroupLabel",
      optionGroupChildren: "optionGroupChildren",
      placeholder: "placeholder",
      value: "value",
      dataKey: "dataKey",
      inputId: "inputId",
      size: "size",
      tabindex: [2, "tabindex", "tabindex", numberAttribute],
      ariaLabelledBy: "ariaLabelledBy",
      inputLabel: "inputLabel",
      ariaLabel: "ariaLabel",
      appendTo: "appendTo",
      disabled: [2, "disabled", "disabled", booleanAttribute],
      showClear: [2, "showClear", "showClear", booleanAttribute],
      panelStyleClass: "panelStyleClass",
      panelStyle: "panelStyle",
      overlayOptions: "overlayOptions",
      autofocus: [2, "autofocus", "autofocus", booleanAttribute],
      showTransitionOptions: "showTransitionOptions",
      variant: "variant",
      loading: [2, "loading", "loading", booleanAttribute],
      loadingIcon: "loadingIcon",
      hideTransitionOptions: "hideTransitionOptions",
      fluid: [2, "fluid", "fluid", booleanAttribute],
      breakpoint: "breakpoint"
    },
    outputs: {
      onChange: "onChange",
      onGroupChange: "onGroupChange",
      onShow: "onShow",
      onHide: "onHide",
      onClear: "onClear",
      onBeforeShow: "onBeforeShow",
      onBeforeHide: "onBeforeHide",
      onFocus: "onFocus",
      onBlur: "onBlur"
    },
    standalone: true,
    features: [ɵɵProvidersFeature([CASCADESELECT_VALUE_ACCESSOR, CascadeSelectStyle]), ɵɵInputTransformsFeature, ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
    decls: 20,
    vars: 34,
    consts: [["container", ""], ["focusInput", ""], ["defaultValueTemplate", ""], ["elseBlock", ""], ["overlay", ""], ["content", ""], ["panel", ""], [3, "click", "ngClass", "ngStyle"], [1, "p-hidden-accessible"], ["readonly", "", "type", "text", "role", "combobox", "aria-haspopup", "tree", 3, "focus", "blur", "keydown", "disabled", "placeholder", "tabindex", "pAutoFocus"], [3, "ngClass"], [4, "ngIf", "ngIfElse"], [4, "ngIf"], ["role", "button", "aria-haspopup", "listbox", 1, "p-cascadeselect-dropdown"], ["role", "status", "aria-live", "polite", 1, "p-hidden-accessible"], [3, "visibleChange", "onAnimationDone", "onBeforeShow", "onShow", "onBeforeHide", "onHide", "visible", "options", "target", "appendTo", "showTransitionOptions", "hideTransitionOptions"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["class", "p-cascadeselect-clear-icon", 3, "click", 4, "ngIf"], [1, "p-cascadeselect-clear-icon", 3, "click"], [4, "ngTemplateOutlet"], ["aria-hidden", "true", 3, "ngClass", 4, "ngIf"], ["aria-hidden", "true", 3, "class", 4, "ngIf"], ["aria-hidden", "true", 3, "ngClass"], ["aria-hidden", "true"], [3, "styleClass", 4, "ngIf"], ["class", "p-cascadeselect-dropdown-icon", 4, "ngIf"], [3, "styleClass"], [1, "p-cascadeselect-dropdown-icon"], [3, "ngClass", "ngStyle"], [1, "p-cascadeselect-list-container"], [3, "onChange", "onFocusChange", "onFocusEnterChange", "options", "selectId", "focusedOptionId", "activeOptionPath", "optionLabel", "optionValue", "level", "optionTemplate", "groupicon", "optionGroupLabel", "optionGroupChildren", "optionDisabled", "root", "dirty", "role"]],
    template: function CascadeSelect_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵelementStart(0, "div", 7, 0);
        ɵɵlistener("click", function CascadeSelect_Template_div_click_0_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onContainerClick($event));
        });
        ɵɵelementStart(2, "div", 8)(3, "input", 9, 1);
        ɵɵlistener("focus", function CascadeSelect_Template_input_focus_3_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onInputFocus($event));
        })("blur", function CascadeSelect_Template_input_blur_3_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onInputBlur($event));
        })("keydown", function CascadeSelect_Template_input_keydown_3_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onInputKeyDown($event));
        });
        ɵɵelementEnd()();
        ɵɵelementStart(5, "span", 10);
        ɵɵtemplate(6, CascadeSelect_ng_container_6_Template, 2, 5, "ng-container", 11)(7, CascadeSelect_ng_template_7_Template, 1, 1, "ng-template", null, 2, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
        ɵɵtemplate(9, CascadeSelect_ng_container_9_Template, 3, 2, "ng-container", 12);
        ɵɵelementStart(10, "div", 13);
        ɵɵtemplate(11, CascadeSelect_ng_container_11_Template, 3, 2, "ng-container", 11)(12, CascadeSelect_ng_template_12_Template, 2, 2, "ng-template", null, 3, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
        ɵɵelementStart(14, "span", 14);
        ɵɵtext(15);
        ɵɵelementEnd();
        ɵɵelementStart(16, "p-overlay", 15, 4);
        ɵɵtwoWayListener("visibleChange", function CascadeSelect_Template_p_overlay_visibleChange_16_listener($event) {
          ɵɵrestoreView(_r1);
          ɵɵtwoWayBindingSet(ctx.overlayVisible, $event) || (ctx.overlayVisible = $event);
          return ɵɵresetView($event);
        });
        ɵɵlistener("onAnimationDone", function CascadeSelect_Template_p_overlay_onAnimationDone_16_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onOverlayAnimationDone($event));
        })("onBeforeShow", function CascadeSelect_Template_p_overlay_onBeforeShow_16_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onBeforeShow.emit($event));
        })("onShow", function CascadeSelect_Template_p_overlay_onShow_16_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.show($event));
        })("onBeforeHide", function CascadeSelect_Template_p_overlay_onBeforeHide_16_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onBeforeHide.emit($event));
        })("onHide", function CascadeSelect_Template_p_overlay_onHide_16_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.hide($event));
        });
        ɵɵtemplate(18, CascadeSelect_ng_template_18_Template, 8, 26, "ng-template", null, 5, ɵɵtemplateRefExtractor);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        let tmp_19_0;
        let tmp_27_0;
        const defaultValueTemplate_r6 = ɵɵreference(8);
        const elseBlock_r7 = ɵɵreference(13);
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngClass", ctx.containerClass)("ngStyle", ctx.style);
        ɵɵattribute("data-pc-name", "cascadeselect")("data-pc-section", "root");
        ɵɵadvance(2);
        ɵɵattribute("data-pc-section", "hiddenInputWrapper");
        ɵɵadvance();
        ɵɵproperty("disabled", ctx.disabled)("placeholder", ctx.placeholder)("tabindex", !ctx.disabled ? ctx.tabindex : -1)("pAutoFocus", ctx.autofocus);
        ɵɵattribute("id", ctx.inputId)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledBy)("aria-expanded", (tmp_19_0 = ctx.overlayVisible) !== null && tmp_19_0 !== void 0 ? tmp_19_0 : false)("aria-controls", ctx.overlayVisible ? ctx.id + "_tree" : null)("aria-activedescendant", ctx.focused ? ctx.focusedOptionId : void 0);
        ɵɵadvance(2);
        ɵɵproperty("ngClass", ctx.labelClass);
        ɵɵattribute("data-pc-section", "label");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.valueTemplate || ctx._valueTemplate)("ngIfElse", defaultValueTemplate_r6);
        ɵɵadvance(3);
        ɵɵproperty("ngIf", ctx.filled && !ctx.disabled && ctx.showClear);
        ɵɵadvance();
        ɵɵattribute("aria-expanded", (tmp_27_0 = ctx.overlayVisible) !== null && tmp_27_0 !== void 0 ? tmp_27_0 : false)("data-pc-section", "dropdownIcon")("aria-hidden", true);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.loading)("ngIfElse", elseBlock_r7);
        ɵɵadvance(4);
        ɵɵtextInterpolate1(" ", ctx.searchResultMessageText, " ");
        ɵɵadvance();
        ɵɵtwoWayProperty("visible", ctx.overlayVisible);
        ɵɵproperty("options", ctx.overlayOptions)("target", "@parent")("appendTo", ctx.appendTo)("showTransitionOptions", ctx.showTransitionOptions)("hideTransitionOptions", ctx.hideTransitionOptions);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, NgStyle, Overlay, AutoFocus, CascadeSelectSub, ChevronDownIcon, TimesIcon, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CascadeSelect, [{
    type: Component,
    args: [{
      selector: "p-cascadeSelect, p-cascadeselect, p-cascade-select",
      standalone: true,
      imports: [CommonModule, Overlay, AutoFocus, CascadeSelectSub, ChevronDownIcon, TimesIcon, SharedModule],
      template: ` <div #container [ngClass]="containerClass" [class]="styleClass" [ngStyle]="style" (click)="onContainerClick($event)" [attr.data-pc-name]="'cascadeselect'" [attr.data-pc-section]="'root'">
        <div class="p-hidden-accessible" [attr.data-pc-section]="'hiddenInputWrapper'">
            <input
                #focusInput
                readonly
                type="text"
                role="combobox"
                [disabled]="disabled"
                [placeholder]="placeholder"
                [tabindex]="!disabled ? tabindex : -1"
                [attr.id]="inputId"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                aria-haspopup="tree"
                [attr.aria-expanded]="overlayVisible ?? false"
                [attr.aria-controls]="overlayVisible ? id + '_tree' : null"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onInputKeyDown($event)"
                [pAutoFocus]="autofocus"
            />
        </div>
        <span [ngClass]="labelClass" [attr.data-pc-section]="'label'">
            <ng-container *ngIf="valueTemplate || _valueTemplate; else defaultValueTemplate">
                <ng-container *ngTemplateOutlet="valueTemplate || _valueTemplate; context: { $implicit: value, placeholder: placeholder }"></ng-container>
            </ng-container>
            <ng-template #defaultValueTemplate>
                {{ label() }}
            </ng-template>
        </span>

        <ng-container *ngIf="filled && !disabled && showClear">
            <TimesIcon *ngIf="!clearIconTemplate && !_clearIconTemplate" class="p-cascadeselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true" />
            <span *ngIf="clearIconTemplate || _clearIconTemplate" class="p-cascadeselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                <ng-template *ngTemplateOutlet="clearIconTemplate || _clearIconTemplate"></ng-template>
            </span>
        </ng-container>

        <div class="p-cascadeselect-dropdown" role="button" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible ?? false" [attr.data-pc-section]="'dropdownIcon'" [attr.aria-hidden]="true">
            <ng-container *ngIf="loading; else elseBlock">
                <ng-container *ngIf="loadingIconTemplate || _loadingIconTemplate">
                    <ng-container *ngTemplateOutlet="loadingIconTemplate || _loadingIconTemplate"></ng-container>
                </ng-container>
                <ng-container *ngIf="!loadingIconTemplate && !_loadingIconTemplate">
                    <span *ngIf="loadingIcon" [ngClass]="'p-cascadeselect-loading-icon pi-spin ' + loadingIcon" aria-hidden="true"></span>
                    <span *ngIf="!loadingIcon" [class]="'p-cascadeselect-loading-icon pi pi-spinner pi-spin'" aria-hidden="true"></span>
                </ng-container>
            </ng-container>
            <ng-template #elseBlock>
                <ChevronDownIcon *ngIf="!triggerIconTemplate && !_triggerIconTemplate" [styleClass]="'p-cascadeselect-dropdown-icon'" />
                <span *ngIf="triggerIconTemplate || _triggerIconTemplate" class="p-cascadeselect-dropdown-icon">
                    <ng-template *ngTemplateOutlet="triggerIconTemplate || _triggerIconTemplate"></ng-template>
                </span>
            </ng-template>
        </div>
        <span role="status" aria-live="polite" class="p-hidden-accessible">
            {{ searchResultMessageText }}
        </span>
        <p-overlay
            #overlay
            [(visible)]="overlayVisible"
            [options]="overlayOptions"
            [target]="'@parent'"
            [appendTo]="appendTo"
            [showTransitionOptions]="showTransitionOptions"
            [hideTransitionOptions]="hideTransitionOptions"
            (onAnimationDone)="onOverlayAnimationDone($event)"
            (onBeforeShow)="onBeforeShow.emit($event)"
            (onShow)="show($event)"
            (onBeforeHide)="onBeforeHide.emit($event)"
            (onHide)="hide($event)"
        >
            <ng-template #content>
                <div #panel [ngClass]="{ 'p-cascadeselect-overlay p-component': true, 'p-cascadeselect-mobile-active': queryMatches() }" [class]="panelStyleClass" [ngStyle]="panelStyle" [attr.data-pc-section]="'panel'">
                    <ng-template *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-template>
                    <div class="p-cascadeselect-list-container" [attr.data-pc-section]="'wrapper'">
                        <p-cascadeselect-sub
                            [options]="processedOptions"
                            [selectId]="id"
                            [focusedOptionId]="focused ? focusedOptionId : undefined"
                            [activeOptionPath]="activeOptionPath()"
                            [optionLabel]="optionLabel"
                            [optionValue]="optionValue"
                            [level]="0"
                            [optionTemplate]="optionTemplate || _optionTemplate"
                            [groupicon]="groupIconTemplate || groupIconTemplate"
                            [optionGroupLabel]="optionGroupLabel"
                            [optionGroupChildren]="optionGroupChildren"
                            [optionDisabled]="optionDisabled"
                            [root]="true"
                            (onChange)="onOptionClick($event)"
                            (onFocusChange)="onOptionMouseMove($event)"
                            (onFocusEnterChange)="onOptionMouseEnter($event)"
                            [dirty]="dirty"
                            [role]="'tree'"
                        >
                        </p-cascadeselect-sub>
                    </div>
                    <span role="status" aria-live="polite" class="p-hidden-accessible">
                        {{ selectedMessageText }}
                    </span>
                    <ng-template *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-template>
                </div>
            </ng-template>
        </p-overlay>
    </div>`,
      providers: [CASCADESELECT_VALUE_ACCESSOR, CascadeSelectStyle],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None
    }]
  }], () => [{
    type: OverlayService
  }], {
    id: [{
      type: Input
    }],
    searchMessage: [{
      type: Input
    }],
    emptyMessage: [{
      type: Input
    }],
    selectionMessage: [{
      type: Input
    }],
    emptySearchMessage: [{
      type: Input
    }],
    emptySelectionMessage: [{
      type: Input
    }],
    searchLocale: [{
      type: Input
    }],
    optionDisabled: [{
      type: Input
    }],
    focusOnHover: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectOnFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autoOptionFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    styleClass: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    optionLabel: [{
      type: Input
    }],
    optionValue: [{
      type: Input
    }],
    optionGroupLabel: [{
      type: Input
    }],
    optionGroupChildren: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    dataKey: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    inputLabel: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    appendTo: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showClear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    panelStyleClass: [{
      type: Input
    }],
    panelStyle: [{
      type: Input
    }],
    overlayOptions: [{
      type: Input
    }],
    autofocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showTransitionOptions: [{
      type: Input
    }],
    variant: [{
      type: Input
    }],
    loading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    loadingIcon: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    fluid: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    breakpoint: [{
      type: Input
    }],
    onChange: [{
      type: Output
    }],
    onGroupChange: [{
      type: Output
    }],
    onShow: [{
      type: Output
    }],
    onHide: [{
      type: Output
    }],
    onClear: [{
      type: Output
    }],
    onBeforeShow: [{
      type: Output
    }],
    onBeforeHide: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    focusInputViewChild: [{
      type: ViewChild,
      args: ["focusInput"]
    }],
    containerViewChild: [{
      type: ViewChild,
      args: ["container"]
    }],
    panelViewChild: [{
      type: ViewChild,
      args: ["panel"]
    }],
    overlayViewChild: [{
      type: ViewChild,
      args: ["overlay"]
    }],
    valueTemplate: [{
      type: ContentChild,
      args: ["value", {
        descendants: false
      }]
    }],
    optionTemplate: [{
      type: ContentChild,
      args: ["option", {
        descendants: false
      }]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    footerTemplate: [{
      type: ContentChild,
      args: ["footer", {
        descendants: false
      }]
    }],
    triggerIconTemplate: [{
      type: ContentChild,
      args: ["triggericon", {
        descendants: false
      }]
    }],
    loadingIconTemplate: [{
      type: ContentChild,
      args: ["loadingicon", {
        descendants: false
      }]
    }],
    groupIconTemplate: [{
      type: ContentChild,
      args: ["optiongroupicon", {
        descendants: false
      }]
    }],
    clearIconTemplate: [{
      type: ContentChild,
      args: ["clearicon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassDebugInfo(CascadeSelect, {
    className: "CascadeSelect"
  });
})();
var CascadeSelectModule = class _CascadeSelectModule {
  static ɵfac = function CascadeSelectModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CascadeSelectModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _CascadeSelectModule
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CascadeSelect, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CascadeSelectModule, [{
    type: NgModule,
    args: [{
      imports: [CascadeSelect, SharedModule],
      exports: [CascadeSelect, SharedModule]
    }]
  }], null, null);
})();
(function() {
  (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(CascadeSelectModule, {
    imports: [CascadeSelect, SharedModule],
    exports: [CascadeSelect, SharedModule]
  });
})();
export {
  CASCADESELECT_VALUE_ACCESSOR,
  CascadeSelect,
  CascadeSelectClasses,
  CascadeSelectModule,
  CascadeSelectStyle,
  CascadeSelectSub
};
//# sourceMappingURL=primeng_cascadeselect.js.map
