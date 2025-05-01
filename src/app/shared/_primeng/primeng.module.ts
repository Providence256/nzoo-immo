import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputTextModule } from 'primeng/inputtext'
import { FormsModule } from '@angular/forms'
import { TreeModule } from 'primeng/tree'
import { TreeTableModule } from 'primeng/treetable'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { ToggleButtonModule } from 'primeng/togglebutton'
import { RippleModule } from 'primeng/ripple'
import { MultiSelectModule } from 'primeng/multiselect'
import { DropdownModule } from 'primeng/dropdown'
import { ProgressBarModule } from 'primeng/progressbar'
import { ToastModule } from 'primeng/toast'
import { SliderModule } from 'primeng/slider'
import { RatingModule } from 'primeng/rating'
import { ToolbarModule } from 'primeng/toolbar'
import { SplitButtonModule } from 'primeng/splitbutton'
import { AccordionModule } from 'primeng/accordion'
import { TabViewModule } from 'primeng/tabview'
import { FieldsetModule } from 'primeng/fieldset'
import { MenuModule } from 'primeng/menu'
import { DividerModule } from 'primeng/divider'
import { SplitterModule } from 'primeng/splitter'
import { PanelModule } from 'primeng/panel'
import { DialogModule } from 'primeng/dialog'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { SidebarModule } from 'primeng/sidebar'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { TooltipModule } from 'primeng/tooltip'
import { BadgeModule } from 'primeng/badge'
import { AvatarModule } from 'primeng/avatar'
import { ScrollPanelModule } from 'primeng/scrollpanel'
import { TagModule } from 'primeng/tag'
import { ChipModule } from 'primeng/chip'
import { SkeletonModule } from 'primeng/skeleton'
import { AvatarGroupModule } from 'primeng/avatargroup'
import { ScrollTopModule } from 'primeng/scrolltop'
import { MessagesModule } from 'primeng/messages'
import { MessageModule } from 'primeng/message'
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { MenubarModule } from 'primeng/menubar'
import { TabMenuModule } from 'primeng/tabmenu'
import { StepsModule } from 'primeng/steps'
import { TieredMenuModule } from 'primeng/tieredmenu'
import { ContextMenuModule } from 'primeng/contextmenu'
import { MegaMenuModule } from 'primeng/megamenu'
import { PanelMenuModule } from 'primeng/panelmenu'
import { ImageModule } from 'primeng/image'
import { GalleriaModule } from 'primeng/galleria'
import { CarouselModule } from 'primeng/carousel'
import { DataViewModule } from 'primeng/dataview'
import { PickListModule } from 'primeng/picklist'
import { OrderListModule } from 'primeng/orderlist'
import { PasswordModule } from 'primeng/password'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { CalendarModule } from 'primeng/calendar'
import { InputMaskModule } from 'primeng/inputmask'
import { InputNumberModule } from 'primeng/inputnumber'
import { CascadeSelectModule } from 'primeng/cascadeselect'
import { KnobModule } from 'primeng/knob'
import { ListboxModule } from 'primeng/listbox'
import { SelectButtonModule } from 'primeng/selectbutton'
import { CheckboxModule } from 'primeng/checkbox'
import { InputSwitchModule } from 'primeng/inputswitch'
import { RadioButtonModule } from 'primeng/radiobutton'
import { ColorPickerModule } from 'primeng/colorpicker'
import { FileUploadModule } from 'primeng/fileupload'
import { ChartModule } from 'primeng/chart'
import { TimelineModule } from 'primeng/timeline'
import { DialogService } from 'primeng/dynamicdialog'
import { CardModule } from 'primeng/card'
import { MessageService } from 'primeng/api'
import { providePrimeNG } from 'primeng/config'
import { DatePickerModule } from 'primeng/datepicker'

@NgModule({
  declarations: [],
  imports: [
    AvatarModule,
    AutoCompleteModule,
    AvatarGroupModule,
    AccordionModule,
    BreadcrumbModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    ChartModule,
    CheckboxModule,
    ColorPickerModule,
    CalendarModule,
    CascadeSelectModule,
    CarouselModule,
    ContextMenuModule,
    ChipModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    CommonModule,
    DataViewModule,
    DatePickerModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FileUploadModule,
    FieldsetModule,
    FormsModule,
    GalleriaModule,
    InputSwitchModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    ImageModule,
    KnobModule,
    ListboxModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MegaMenuModule,
    MenuModule,
    MultiSelectModule,
    OrderListModule,
    OverlayPanelModule,
    PasswordModule,
    PickListModule,
    PanelMenuModule,
    PanelModule,
    ProgressBarModule,
    RadioButtonModule,
    RippleModule,
    RatingModule,
    SelectButtonModule,
    StepsModule,
    ScrollPanelModule,
    SkeletonModule,
    ScrollTopModule,
    SidebarModule,
    SplitButtonModule,
    SplitterModule,
    SliderModule,
    TimelineModule,
    TabMenuModule,
    TieredMenuModule,
    TagModule,
    TooltipModule,
    ToolbarModule,
    TabViewModule,
    TreeModule,
    TreeTableModule,
    TableModule,
    ToggleButtonModule,
    ToastModule,
  ],
  exports: [
    AvatarModule,
    AutoCompleteModule,
    AvatarGroupModule,
    AccordionModule,
    BreadcrumbModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    ChartModule,
    CheckboxModule,
    ColorPickerModule,
    CalendarModule,
    CascadeSelectModule,
    CarouselModule,
    ContextMenuModule,
    ChipModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    CommonModule,
    DataViewModule,
    DatePickerModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FileUploadModule,
    FieldsetModule,
    FormsModule,
    GalleriaModule,
    InputSwitchModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    ImageModule,
    KnobModule,
    ListboxModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MegaMenuModule,
    MenuModule,
    MultiSelectModule,
    OrderListModule,
    OverlayPanelModule,
    PasswordModule,
    PickListModule,
    PanelMenuModule,
    PanelModule,
    ProgressBarModule,
    RadioButtonModule,
    RippleModule,
    RatingModule,
    SelectButtonModule,
    StepsModule,
    ScrollPanelModule,
    SkeletonModule,
    ScrollTopModule,
    SidebarModule,
    SplitButtonModule,
    SplitterModule,
    SliderModule,
    TimelineModule,
    TabMenuModule,
    TieredMenuModule,
    TagModule,
    TooltipModule,
    ToolbarModule,
    TabViewModule,
    TreeModule,
    TreeTableModule,
    TableModule,
    ToggleButtonModule,
    ToastModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
   MessageService,
    DialogService,
  ],
})
export class PrimengModule {}


