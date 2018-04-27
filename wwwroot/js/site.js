// Hide all submenus then show the submenu.
$("a[data-display-menu]").on("click", function () {
    // The <a> being clicked on.
    var menuItem = $(this),

        // The name of the sub menu to display.
        menuToDisplayName = menuItem.attr("data-display-menu"),

        // The <nav> to display.
        menuToDisplay = $("[data-sub-menu=" + menuToDisplayName + "]");

    $("[data-sub-menu]").hide();
    menuToDisplay.show();

    $(".main-menu li").removeClass("active");
    menuItem.closest("li").addClass("active");

    // var value = $(this).attr("data-display-menu");
    // var submenu = $("." + value);

    // $(".sidebar-submenu").hide();
    // $("a[data-sub-menu]").parent().removeClass("active");
    // $(submenu).show();
});

// Hide all submenus on document ready.
$(function () {
    $(".sidebar-submenu").hide();

    // Prevents undefined behavior.
    // If selectedNavItem is falsy, it wasn't set in the view model in express.
    // Therefore, it doesn't make sense to try to initialize the menu.
    if (!selectedNavItem) return;

    // The "<a>" tag which represents the current page.
    var selectedNavA = $("[data-nav-item=" + selectedNavItem + "]");

    // The "<nav>" tag which represents the sub menu of the current page.
    var selectedNavParent = selectedNavA.closest("nav");

    // The name of the sub menu represented by selectedNavParent above.
    var selectedNavMenuName = selectedNavParent.attr("data-sub-menu");

    // The menu item which represents the sub menu of the current page.
    var menu = $("[data-display-menu=" + selectedNavMenuName + "]");

    menu.parent().addClass("active");
    selectedNavA.parent().addClass("active");

    selectedNavParent.show();
});

// Contact form.

$('select')
    .change(function () {
        var value = $(this).val();
        var formSwitch = $('#switch');
        $('[data-switch]').each(function () {
            var elem = $(this);
            var switchValue = elem.attr('data-switch');
            if (switchValue == value) {
                formSwitch.append(elem);
                elem.show();
            } else {
                elem.appendTo(document.body);
                elem.hide();
            }
        });
    })
    .change();

