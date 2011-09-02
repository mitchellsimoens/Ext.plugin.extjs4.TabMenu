/**
 * @author Mitchell Simoens (mitchell.simoens@sencha.com)
 * @docauthor Mitchell Simoens (mitchell.simoens@sencha.com)
 *
 * This plugin allows to show a Menu on the Tab that was right-clicked on.
 *
 * You can specify the menu config on the plugin as an Array,
 * {@link Ext.menu.Menu} config Object or an instance of {@link Ext.menu.Menu}.
 *
 * Example usage:
 *
 *     @example
 *     var tabpanel = Ext.create('Ext.tab.Panel', {
 *         renderTo : Ext.getBody(),
 *         width    : 400,
 *         height   : 400,
 *         title    : 'Ext.plugin.extjs4.TabMenu',
 *         defaults : {
 *             closable : true
 *         },
 *         plugins  : {
 *             ptype : 'tabmenu',
 *             menu  : [
 *                 {
 *                     text    : 'Close Tab',
 *                     handler : function() {
 *                         var tab = tabpanel.activeTab;
 *                         tabpanel.remove(tab);
 *                     }
 *                 },
 *                 '-',
 *                 {
 *                     text    : 'Close Other Tabs',
 *                     handler : function() {
 *                         var items = tabpanel.items,
 *                             tab   = tabpanel.activeTab;
 *
 *                         items.each(function(item) {
 *                             if (item.id !== tab.id) {
 *                                 tabpanel.remove(item);
 *                             }
 *                         });
 *                     }
 *                 },
 *                 {
 *                     text    : 'Close All',
 *                     handler : function() {
 *                         tabpanel.removeAll();
 *                     }
 *                 }
 *             ]
 *         },
 *         items    : [
 *             {
 *                 title : 'Tab 1',
 *                 html  : 'This is Tab 1'
 *             },
 *             {
 *                 title : 'Tab 2',
 *                 html  : 'This is Tab 2'
 *             },
 *             {
 *                 title : 'Tab 3',
 *                 html  : 'This is Tab 3'
 *              }
 *         ]
 *     });
 */

Ext.define('Ext.plugin.extjs4.TabMenu', {
    extend : 'Ext.AbstractPlugin',
    alias  : 'plugin.tabmenu',

    //@private
    init: function(tabpanel) {
        var me = this;

        tabpanel.on('afterrender', me.addTabListener, me, { single : true });
    },

    //@private
    destroy: function() {
        var me = this;

        me.menu.destroy();
        delete me.menu;
    },

    //@private
    addTabListener: function(tabpanel) {
        var me  = this,
            bar = tabpanel.down('tabbar');

        bar.mon(bar.el, {
            scope       : me,
            delegate    : 'div.x-tab',
            contextmenu : me.showMenu
        });
    },

    //@private
    showMenu: function(e, t, opts) {
        e.preventDefault();

        var me        = this,
            el        = Ext.get(t),
            menu      = me.getMenu();

        menu.showBy(el);
    },

    /**
     * Transforms the menu config option into a valid {@link Ext.menu.Menu} instance.
     * @eturn {@link Ext.menu.Menu} menu
     */
    getMenu: function() {
        var me = this;

        if (me.menu instanceof Ext.menu.Menu) {
            return me.menu;
        }

        var menu = me.menu || {};

        if (Ext.isArray(menu)) {
            menu = {
                items : menu
            };
        }

        return me.menu = Ext.create('Ext.menu.Menu', menu);
    }
});