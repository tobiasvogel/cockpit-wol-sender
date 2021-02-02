const result = document.getElementById('status');

(function() {

	$( "#wakeonlan-page #addhost div.forminput.macaddress input" ).on( "blur", function () {
		if ($( this )[0].value == "") {
			$( $( this )[0] ).removeClass("validated");
			$( $( this )[0] ).removeClass("invalid");
			$( $( this )[0] ).removeAttr("data-valid");
			return;
		}
		var allowed = "0123456789abcdef";
		var retvalue = "";
		var check = $( this )[0].value.toLowerCase().charAt(0);
		if (allowed.indexOf(check) < 0) {
			console.log("invalid character: "+$( this )[0].value.charAt(0));
			$( $( this )[0] ).removeClass("validated");
			$( $( this )[0] ).addClass("invalid");
			$( $( this )[0] ).attr("data-valid", "false");
		} else {
			retvalue += check;
			$( $( this )[0] ).removeClass("invalid");
			$( $( this )[0] ).addClass("validated");
			$( $( this )[0] ).attr("data-valid", "true");
			macaddress_lookup();
		}
		check = $( this )[0].value.toLowerCase().charAt(1);
		if (allowed.indexOf(check) < 0) {
			console.log("invalid character: "+$( this )[0].value.charAt(1));
			$( $( this )[0] ).removeClass("validated");
			$( $( this )[0] ).addClass("invalid");
			$( $( this )[0] ).attr("data-valid", "false");
		} else {
			retvalue += check;
			$( $( this )[0] ).removeClass("invalid");
			$( $( this )[0] ).addClass("validated");
			$( $( this )[0] ).attr("data-valid", "true");
			macaddress_lookup();
		}
		$( this )[0].value = retvalue;
		if ($( this )[0].value.length != 2) {
			$( $( this )[0] ).removeClass("validated");
			$( $( this )[0] ).addClass("invalid");
			$( $( this )[0] ).attr("data-valid", "false");
		}
	});
	$( "#wakeonlan-page #addhost div.forminput.ipaddress input" ).on( "blur", function () {
		if ($( this )[0].value == "") {
			$( $( this )[0] ).removeClass("validated");
			$( $( this )[0] ).removeClass("invalid");
			$( $( this )[0] ).removeAttr("data-valid");
			return;
		}
		var allowed = "0123456789";
		var retvalue = "";
		var check = $( this )[0].value.toLowerCase().charAt(0);
		if ($(this)[0].value.length == 1 || $(this)[0].value.length == 2 || $(this)[0].value.length == 3) {
		if (allowed.indexOf(check) < 0) {
			console.log("invalid character: "+$( this )[0].value.charAt(0));
			$( $( this )[0] ).removeClass("validated");
			$( $( this )[0] ).addClass("invalid");
			$( $( this )[0] ).attr("data-valid", "false");
		} else {
			retvalue += check;
			$( $( this )[0] ).removeClass("invalid");
			$( $( this )[0] ).addClass("validated");
			$( $( this )[0] ).attr("data-valid", "true");
		}
		}
		if ($(this)[0].value.length == 2 || $(this)[0].value.length == 3) {
		check = $( this )[0].value.toLowerCase().charAt(1);
		if (allowed.indexOf(check) < 0) {
			console.log("invalid character: "+$( this )[0].value.charAt(1));
			$( $( this )[0] ).removeClass("validated");
			$( $( this )[0] ).addClass("invalid");
			$( $( this )[0] ).attr("data-valid", "false");
		} else {
			retvalue += check;
			$( $( this )[0] ).removeClass("invalid");
			$( $( this )[0] ).addClass("validated");
			$( $( this )[0] ).attr("data-valid", "true");
		}
		}
		if ($(this)[0].value.length == 3) {
		check = $( this )[0].value.toLowerCase().charAt(2);
		if (allowed.indexOf(check) < 0) {
			console.log("invalid character: "+$( this )[0].value.charAt(2));
			$( $( this )[0] ).removeClass("validated");
			$( $( this )[0] ).addClass("invalid");
			$( $( this )[0] ).attr("data-valid", "false");
		} else {
			retvalue += check;
			$( $( this )[0] ).removeClass("invalid");
			$( $( this )[0] ).addClass("validated");
			$( $( this )[0] ).attr("data-valid", "true");
		}
		}
		if ($( this )[0].value.length < 1 || $( this )[0].value.length > 3) {
			$( $( this )[0] ).removeClass("validated");
			$( $( this )[0] ).addClass("invalid");
			$( $( this )[0] ).attr("data-valid", "false");
		}
		if (parseInt($( this )[0].value,10) > 255 || parseInt($( this )[0].value,10) < 0) {
			$( $( this )[0] ).removeClass("validated");
			$( $( this )[0] ).addClass("invalid");
			$( $( this )[0] ).attr("data-valid", "false");

		}
		$( this )[0].value = retvalue;
	});

	$( "#wakeonlan-page #addhost div.forminput.macaddress input, #wakeonlan-page #addhost div.forminput.ipaddress input" ).bind( "input", function () {
		var $this = $(this)[0];
    		setTimeout(function() {
			if ( $this.value.length >= parseInt($this.maxLength,10) ) {
				var next = $this.nextElementSibling;
				if (!(next == null)) {
            				$this.nextElementSibling.focus();
				}
			}
    		},0);
	});

	$( "#wakeonlan-page #addhost div.formreset button ").on( "click", function() {
		addhost_clearall();
	});

	$( "#wakeonlan-page #addhost div.formsubmit button ").on( "click", function() {

		if (!(addhost_checkall())) { return; }
		
		var datastring = "";
		var hostname = "";
		var description = "";
		var macaddress = "";
		var subnet = "";
		var netmask = "";
		var lastknownip = "";
		hostname = $( "#wakeonlan-page #addhost div.forminput input[name=hostname]" )[0].value;

		description = $( "#wakeonlan-page #addhost div.forminput input[name=description]" )[0].value;

		macaddress += $( "#wakeonlan-page #addhost div.forminput input[name=mac-1]" )[0].value;
		macaddress += ":";
		macaddress += $( "#wakeonlan-page #addhost div.forminput input[name=mac-2]" )[0].value;
		macaddress += ":";
		macaddress += $( "#wakeonlan-page #addhost div.forminput input[name=mac-3]" )[0].value;
		macaddress += ":";
		macaddress += $( "#wakeonlan-page #addhost div.forminput input[name=mac-4]" )[0].value;
		macaddress += ":";
		macaddress += $( "#wakeonlan-page #addhost div.forminput input[name=mac-5]" )[0].value;
		macaddress += ":";
		macaddress += $( "#wakeonlan-page #addhost div.forminput input[name=mac-6]" )[0].value;

		subnet += $( "#wakeonlan-page #addhost div.forminput input[name=subnet-1]" )[0].value;
		subnet += ".";
		subnet += $( "#wakeonlan-page #addhost div.forminput input[name=subnet-2]" )[0].value;
		subnet += ".";
		subnet += $( "#wakeonlan-page #addhost div.forminput input[name=subnet-3]" )[0].value;
		subnet += ".";
		subnet += $( "#wakeonlan-page #addhost div.forminput input[name=subnet-4]" )[0].value;
		netmask += $( "#wakeonlan-page #addhost div.forminput input[name=netmask-1]" )[0].value;
		netmask += ".";
		netmask += $( "#wakeonlan-page #addhost div.forminput input[name=netmask-2]" )[0].value;
		netmask += ".";
		netmask += $( "#wakeonlan-page #addhost div.forminput input[name=netmask-3]" )[0].value;
		netmask += ".";
		netmask += $( "#wakeonlan-page #addhost div.forminput input[name=netmask-4]" )[0].value;
		lastknownip += $( "#wakeonlan-page #addhost div.forminput input[name=lastip-1]" )[0].value;
		lastknownip += ".";
		lastknownip += $( "#wakeonlan-page #addhost div.forminput input[name=lastip-2]" )[0].value;
		lastknownip += ".";
		lastknownip += $( "#wakeonlan-page #addhost div.forminput input[name=lastip-3]" )[0].value;
		lastknownip += ".";
		lastknownip += $( "#wakeonlan-page #addhost div.forminput input[name=lastip-4]" )[0].value;

		datastring += hostname;
		datastring += ";";
		datastring += description;
		datastring += ";";
		datastring += macaddress;
		datastring += ";";
		datastring += subnet;
		datastring += ";";
		datastring += netmask;
		datastring += ";";
		datastring += lastknownip;

		addhost_disableall();

		cockpit.spawn(["/home/pi/.local/share/cockpit/wol-sender/cgi/insert-sqlite.pl", "/home/pi/.local/share/cockpit/wol-sender/db/wakeonlan.db", datastring])
		.then(addhost_success(hostname))
		.catch(table_failed);
	});

	cockpit.spawn(["/home/pi/.local/share/cockpit/wol-sender/cgi/read-sqlite.pl", "/home/pi/.local/share/cockpit/wol-sender/db/wakeonlan.db"])
        .stream(table_output)
        .catch(table_failed);

	result.innerHTML = "";

})();

$( "#wol-sender-filter.btn-group button" ).on( "click", function() {
	$( "#wol-sender-filter.btn-group button" ).removeClass( "active" );
	$( "#wol-sender-filter.btn-group button" ).removeAttr( "aria-current" );

	$( this ).addClass( "active" );
	$( this ).attr( "aria-current", true );

	console.log( $( this ).data("tab") );
	$( "#wakeonlan-page > #tab-content div.tabcontainer" ).attr("hidden", "hidden");
	$( "#wakeonlan-page > #tab-content #"+$( this ).data("tab") ).removeAttr("hidden");
});


function table_output(data) {
	$( "#wakeonlan-page #clients table" ).replaceWith(data);
	$( "#wakeonlan-page #clients table" ).addClass("clients");
	$( "#wakeonlan-page #clients table thead tr" ).append("<th class=\"tableheader\" scope=\"col\" colspan=\"3\">action</th>");
	$( "#wakeonlan-page #clients table tbody tr" ).append("<td class=\"wakeup\"><span class=\"wakeupaction alarmclock\"></span></td>");
	$( "#wakeonlan-page #clients table tbody tr" ).append("<td class=\"edititem\"><span class=\"editaction editpencil\"></span></td>");
	$( "#wakeonlan-page #clients table tbody tr" ).append("<td class=\"deleteitem\"><span class=\"deleteaction delete-trash\"></span></td>");
}

function addhost_success(hostname) {

}

function addhost_checkall() {

}

function addhost_disableall() {
	$( "#wakeonlan-page #addhost div.forminput input" )[0].attr("disabled", "disabled");
}
function addhost_enableall() {
	$( "#wakeonlan-page #addhost div.forminput input" )[0].removeAttr("disabled");
}
function addhost_clearall() {
	$( "#wakeonlan-page #addhost div.forminput input" ).val("");
	$( "#wakeonlan-page #addhost div.forminput input" ).removeAttr("disabled");
	$( "#wakeonlan-page #addhost div.forminput input" ).removeClass("validated");
	$( "#wakeonlan-page #addhost div.forminput input" ).removeClass("invalid");
	$( "#wakeonlan-page #addhost div.forminput input" ).removeAttr("data-valid");
}

function table_failed() {
	result.innerHTML = "<span style=\"color: red;\">ERR: failed to access table of clients.</span>";
}

function ipaddr() {

}

function macaddress_lookup() {
		if ( $( "#wakeonlan-page #addhost div.forminput input[name=mac-1]" ).hasClass("validated") == true &&
		     $( "#wakeonlan-page #addhost div.forminput input[name=mac-2]" ).hasClass("validated") == true &&
		     $( "#wakeonlan-page #addhost div.forminput input[name=mac-3]" ).hasClass("validated") == true &&
		     $( "#wakeonlan-page #addhost div.forminput input[name=mac-4]" ).hasClass("validated") == true &&
		     $( "#wakeonlan-page #addhost div.forminput input[name=mac-5]" ).hasClass("validated") == true &&
		     $( "#wakeonlan-page #addhost div.forminput input[name=mac-6]" ).hasClass("validated") == true ) {
			if ( $( "#wakeonlan-page #addhost .maclookup" ).hasClass("lookup-lock") ) { return; }
			var macaddress = "";
			macaddress += $( "#wakeonlan-page #addhost div.forminput input[name=mac-1]" )[0].value;
			macaddress += ":";
			macaddress += $( "#wakeonlan-page #addhost div.forminput input[name=mac-2]" )[0].value;
			macaddress += ":";
			macaddress += $( "#wakeonlan-page #addhost div.forminput input[name=mac-3]" )[0].value;
			macaddress += ":";
			macaddress += $( "#wakeonlan-page #addhost div.forminput input[name=mac-4]" )[0].value;
			macaddress += ":";
			macaddress += $( "#wakeonlan-page #addhost div.forminput input[name=mac-5]" )[0].value;
			macaddress += ":";
			macaddress += $( "#wakeonlan-page #addhost div.forminput input[name=mac-6]" )[0].value;

			if ( $( $( "#wakeonlan-page #addhost .maclookup" )[0] ).attr("data-macaddress") == macaddress ) { return; }
			
			var lookupaddr = encodeURI("https://api.macvendors.com/" + macaddress);
			$( "#wakeonlan-page #addhost .maclookup" ).addClass("lookup-lock");
			$( $( "#wakeonlan-page #addhost .maclookup" )[0] ).attr("data-macaddress", macaddress);


			setTimeout(function() {
				$( "#wakeonlan-page #addhost .maclookup" ).removeClass("lookup-lock");
			},2000);

			cockpit.spawn(["curl", "--url", lookupaddr])
			.stream(maclookup_success)
			.catch(maclookup_failed);
		}
}

function maclookup_success(data) {
	$( "#wakeonlan-page #addhost .maclookup" ).html(data);
}

function maclookup_failed() {
	$( "#wakeonlan-page #addhost .maclookup" ).innerHTML = "Mac Address lookup failed.";
}
