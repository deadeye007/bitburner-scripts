/** @param {NS} ns **/
export async function main(ns) {
	// Initialize variables
	var i = 0
	var j = 0
	var k = 0
	var l = 0

	var debug = false

	// Highest tolerable heat before switching from "Joker Mode" to "Batman Mode"
	var heatMax = 0.25

	// Set gang's priority
	var goalMoney = true
	var goalRespect = false

	if (!debug) {
		ns.disableLog("getServerMoneyAvailable");
	}

	// If in gang, do gang stuff; if not, script ends
	if (ns.gang.inGang()) {
		// Print faction gang information
		var memberNames = ns.gang.getMemberNames();
		var eqNames = ns.gang.getEquipmentNames();
		var taskNames = ns.gang.getTaskNames();
		
		// If you can recruit members, recruit members with totally badass names.	
		while (ns.gang.canRecruitMember()) {
			var gangMember = "lackey-" + i
			// If the member name already exists, skip purchasing
			if (memberNames[gangMember]) { ns.tprintf("Member " + gangMember + " exists. Iterating."); }
			else { ns.gang.recruitMember(gangMember); }
			
			// Sleep for one second
			await ns.sleep(1000);
			++i;
		}

		// Equipment Purchase
		for (j = 0; j < 16; j++) {
			for (k = 0; k < memberNames.length; k++) {
				if (ns.gang.getEquipmentCost(eqNames[j]) < ns.getServerMoneyAvailable("home")) {
					ns.gang.purchaseEquipment(memberNames[k], eqNames[j])
				}
			}
		}

		// Normal Gang Operations Loop
		while(true) {
			for (l = 0; l < memberNames.length; l++) {
				var gangInfo = ns.gang.getGangInformation();
				var faction = gangInfo["faction"];
				var wantedPenalty = 1 - gangInfo["wantedPenalty"];
				var territory = gangInfo["territory"];
				var wantedLevel = gangInfo["wantedLevel"];
				var memberInfo = ns.gang.getMemberInformation(memberNames[l]);

				if (debug) {
					ns.tprint(memberInfo);
					ns.tprint(wantedPenalty);
				}
				
				if (wantedPenalty > heatMax && memberInfo["task"] != taskNames[10]) {
					// Vigilante Justice
					ns.gang.setMemberTask(memberNames[l], taskNames[10]);
				}

				if (wantedPenalty <= (heatMax * 0.10) || wantedLevel == 1) {
					// Terrorism
					if (memberInfo["str"] > 200 && goalRespect == true) { ns.gang.setMemberTask(memberNames[l], taskNames[9]); }
					
					// Threaten & Blackmail					
					else if (memberInfo["str"] > 135) { ns.gang.setMemberTask(memberNames[l], taskNames[7]); }

					// Traffick Illegal Arms
					else if (memberInfo["str"] > 120) { ns.gang.setMemberTask(memberNames[l], taskNames[6]); }

					// Armed Robbery
					else if (memberInfo["str"] < 100) { ns.gang.setMemberTask(memberNames[l], taskNames[5]); }

					// Human Trafficking
					if (memberInfo["cha"] > 100 && goalMoney == true) { ns.gang.setMemberTask(memberNames[l], taskNames[8]); }

				}
			
				// Train Combat
				if (memberInfo["str"] < 100) {
					ns.gang.setMemberTask(memberNames[l], taskNames[11]);
				}

				await ns.sleep(5000);
			}

			// Sleep one second to avoid endless loop
			await ns.sleep(10000);
		}
	}
}