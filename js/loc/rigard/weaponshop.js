
//
// Weapon Shop
//

Scenes.Rigard.WeaponShop = {};
Scenes.Rigard.WeaponShop.IsOpen = function() {
	return (world.time.hour >= 8 && world.time.hour < 17) && !rigard.UnderLockdown();
}

world.loc.Rigard.ShopStreet.WeaponShop.description = function() {
	Scenes.Cassidy.ShopDesc();
}

world.loc.Rigard.ShopStreet.WeaponShop.onEntry = function() {
	var first = cassidy.flags["Met"] < Cassidy.Met.Met;
	if(first) {
		Scenes.Cassidy.First();
	}
	else if(!(cassidy.flags["Talk"] & Cassidy.Talk.MShop) && (cassidy.Relation() >= 10) && (world.time.hour < 12)) {
		Scenes.Cassidy.ManagingShop();
	}
	else if((cassidy.flags["Met"] == Cassidy.Met.WentBack) && (cassidy.Relation() >= 30)) {
		Scenes.Cassidy.BigReveal();
	}
	else {
		PrintDefaultOptions();
	}
}

//TODO

world.loc.Rigard.ShopStreet.WeaponShop.events.push(new Link(
	"Cassidy", true, true, null,
	function() {
		Scenes.Cassidy.Approach();
	}
));

world.loc.Rigard.ShopStreet.WeaponShop.events.push(new Link(
	"Leave", true, true, null,
	function() {
		MoveToLocation(world.loc.Rigard.ShopStreet.street, {minute: 5});
	}
));

Scenes.Rigard.WeaponShop.StreetDesc = function() {
	var parse = {};
	
	var first = cassidy.flags["Met"] < Cassidy.Met.Met;
	var open  = Scenes.Rigard.WeaponShop.IsOpen();
	var order = (cassidy.flags["Order"] != Cassidy.Order.None) && !cassidy.orderTimer.Expired();
	
	if(first) {
		if(open)
			Text.Add("Off to the side of the main street, you spy a modest brick building, clean and definitely looking in its place along the main merchants’ row. The windows are heavily barred, but the door is wide open and a small sign in the shape of a flame-wreathed blade announces the establishment’s name: The Pale Flame.", parse);
		else
			Text.Add("Off to the side of the main merchants’ row, you spy a clean and modest building shaped from white brick. The windows are barred, and a thick steel grille has been set over the main entrance, no doubt barred from inside. Seems like opening hours are over - you’ll have to come back in the morning if you want to get in.", parse);
	}
	else {
		Text.Add("Off to one side of the main merchants’ row, you spy the familiar sight of The Pale Flame nestled amongst the other stores. ", parse);
		if(open)
			Text.Add("The windows might be barred as always, but the door is invitingly open should you wish to browse Cassidy’s wares.", parse);
		else {
			Text.Add("A grille has been drawn over the main door - which in turn has been no doubt barred from within. You’ll have to come back in the morning should you wish to browse Cassidy’s wares.", parse);
			if(order)
				Text.Add(" However, through one of the windows you spy the yellow-white blaze of the forge at work. Seems like Cassidy’s busy, all right - you can only wonder what you’ll be getting at the end of it all…", parse);
		}
	}
	Text.NL();
}
