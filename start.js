/** @param {NS} ns **/
export async function main(ns) {

	while(true) {
		// Define variables for daemon
		var scriptBotnet = "update-botnet.js"
		var purchaseScript = "/servers/purchase-server.js"
		var script = "hack.js"
		var tools = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPworm.exe", "SQLInject.exe"]
		var toolCount = 0
		var i;

		var debug = false;
		
		if (debug) {
		ns.disableLog("getServerMaxRam")
		ns.disableLog("getScriptRam")
		ns.disableLog("sleep")
		}

		// Start Botnet Updating script
		if (!ns.isRunning(scriptBotnet)) { ns.exec(scriptBotnet, "home"); await ns.sleep(2000); }

		// Spawn script, if it doesn't exist
		if (!ns.isRunning(script)) { 
			var scriptRam = ns.getScriptRam(script);
			var ram = ns.getServerMaxRam("home");
			if (ram <= 32) {var homePct = 0.50}
			if (ram >= 64) {var homePct = 0.70}
			if (ram >= 128) {var homePct = 0.90}
			if (ram >= 256) {var homePct = 0.98}
			var scriptThreads = (Math.floor(ram / scriptRam) * homePct);
			await ns.exec(script, "home", scriptThreads);
			await ns.sleep(2000);
			}


		// Only check if max servers have not been purchased and the purchasing script isn't currently running
		if ((ns.getPurchasedServers().length != ns.getPurchasedServerLimit()) && !ns.isRunning(purchaseScript)) { 
			for (i=0; i < tools.length; i++) {
				if (ns.fileExists(tools[i])) {
					toolCount++;
				}
			}
			// Start purchasing servers, if I possess all hacking tools
			if (toolCount == 5) { await ns.exec(purchaseScript, "home"); }
		} else { await ns.sleep(10000); }
		
		// Sleep for one second
		await ns.sleep(1000);
	}
}