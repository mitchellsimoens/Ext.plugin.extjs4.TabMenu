Ext.onReady(function() {
    var tabpanel = Ext.create('Ext.tab.Panel', {
        renderTo : Ext.getBody(),
        width    : 400,
        height   : 400,
        title    : 'Ext.plugin.extjs4.TabMenu',
        defaults : {
            closable : true
        },
        plugins  : {
            ptype : 'tabmenu',
            menu  : {
                items : [
                    {
                        text    : 'Close Tab',
                        handler : function() {
                            var tab = tabpanel.activeTab;
                            tabpanel.remove(tab);
                        }
                    },
                    '-',
                    {
                        text    : 'Close Other Tabs',
                        handler : function() {
                            var items = tabpanel.items,
                                tab   = tabpanel.activeTab;
                            items.each(function(item) {
                                if (item.id !== tab.id) {
                                    tabpanel.remove(item);
                                }
                            });
                        }
                    },
                    {
                        text    : 'Close All',
                        handler : function() {
                            tabpanel.removeAll();
                        }
                    }
                ],
                listeners : {
                    show : function(menu) {
                        var items     = tabpanel.items,
                            numItems  = items.getCount(),
                            menuItems = menu.query('menuitem'),
                            action    = numItems > 1 ? 'enable' : 'disable';

                        menuItems[2][action]();
                    }
                }
            }
        },
        items    : [
            {
                title : 'Tab 1',
                html  : 'This is Tab 1'
            },
            {
                title : 'Tab 2',
                html  : 'This is Tab 2'
            },
            {
                title : 'Tab 3',
                html  : 'This is Tab 3'
            }
        ]
    });

    setTimeout(function() {
        tabpanel.add({
            title : 'Tab 4',
            html  : 'This is Tab 4'
        });
    }, 500);
});