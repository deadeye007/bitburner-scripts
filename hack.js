/** @param {NS} ns **/
export async function main(ns) {
    // var target = ns.args[0];
	var host = ["n00dles", "zer0", "neo-net", "the-hub", "catalyst", "millenium-fitness", "aerocorp", "unitalife", "solaris", "infocomm", "taiyang-digital", "crush-fitness", "rothman-uni", "lexo-corp", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "max-hardware", "phantasy", "comptek", "syscore", "alpha-ent", "galactic-cyber", "omnia", "zeus-med", "global-pharm", "snap-fitness", "deltaone", "icarus", "univ-energy", "zb-def", "nova-med", "netlink", "zb-institute", "omega-net", "iron-gym", "nectar-net", "silver-helix", "johnson-ortho", "summit-uni", "rho-construction", "aevum-police", "microdyne", "titan-labs", "vitalife", "applied-energetics", "helios", "omnitek", "b-and-a", "megacorp", "4sigma", "clarkinc", "ecorp", "kuai-gong", "blade", "nwo"];
	var i = host.length - 1;

    while(true) {
		try {
			while (i > -1) {
				if (ns.hasRootAccess(host[i]) && ns.getServerMaxMoney(host[i]) > 0) { var target = host[i]; break; }
				i--;
				await ns.sleep(1000);
				}
			
			// Override if you're over 1300 Hacking Level
			if (ns.hasRootAccess("megacorp") && ns.getHackingLevel() >= 1300) { var target = "megacorp"; }
		}
		catch (e) { i--; }
		
		try {
			var moneyThreshold = ns.getServerMaxMoney(target) * 0.75;
			var securityThreshold = ns.getServerMinSecurityLevel(target) + 5;
			
			if (ns.hasRootAccess(target)) {    
				if (ns.getServerSecurityLevel(target) > securityThreshold) {
					await ns.weaken(target);
					
				} else if (ns.getServerMoneyAvailable(target) < moneyThreshold) {
					await ns.grow(target);

				} else {
					await ns.hack(target);
				}
			}
		}
		catch (e) { ns.toast("ERROR: Unable to hack host: " + host[i]); }
		
		// Sleep for one second at the end of the loop
		await ns.sleep(1000);
	}
}