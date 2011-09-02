Ext.define('Ext.plugin.extjs4.TabMenu', {
    extend : 'Ext.AbstractPlugin',
    alias  : 'plugin.tabmenu',

    init: function(tabpanel) {
        var me = this;

        tabpanel.on('afterrender', me.addTabListener, me, { single : true });
    },

    addTabListener: function(tabpanel) {
        var me  = this,
            bar = tabpanel.down('tabbar');

        bar.mon(bar.el, {
            scope       : me,
            delegate    : 'div.x-tab',
            contextmenu : me.showMenu
        });
    },

    showMenu: function(e, t, opts) {
        e.preventDefault();

        var me        = this,
            el        = Ext.get(t),
            menu      = me.getMenu(),
            tabpanel  = me.cmp,
            numItems  = tabpanel.items.getCount(),
            menuItems = menu.query('menuitem'),
            action    = numItems > 1 ? 'enable' : 'disable';

        menuItems[2][action]();

        menu.showBy(el);
    },

    getMenu: function() {
        var me = this;

        if (me.tabMenu) {
            return me.tabMenu;
        }

        var menu = me.menu || [];

        return me.tabMenu = Ext.create('Ext.menu.Menu', {
            items : menu
        });
    }
});