/** @param {NS} ns **/
export async function main(ns) {
    // Easy Botnet Updater
    
        while(true) {
            // Script & Script RAM
            var script = "hack.js";
            var scriptRam = ns.getScriptRam(script);
            var host = ["n00dles", "zer0", "CSEC", "neo-net", "the-hub", "catalyst", "I.I.I.I", "millenium-fitness", "aerocorp", "unitalife", "solaris", "infocomm", "taiyang-digital", "crush-fitness", "rothman-uni", "lexo-corp", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "max-hardware", "phantasy", "comptek", "syscore", "alpha-ent", "galactic-cyber", "omnia", "defcomm", "zeus-med", "global-pharm", "snap-fitness", "deltaone", "icarus", "univ-energy", "zb-def", "nova-med", "netlink", "avmnite-02h", "zb-institute", "omega-net", "iron-gym", "nectar-net", "silver-helix", "johnson-ortho", "summit-uni", "rho-construction", "aevum-police", "darkweb", "microdyne", "run4theh111z", "titan-labs", "vitalife", "applied-energetics", "fulcrumtech", "stormtech", "helios", "omnitek", "b-and-a", "megacorp", "4sigma", "clarkinc", "powerhouse-fitness", "ecorp", "kuai-gong", "blade", ".", "nwo", "fulcrumassets", "The-Cave", "w0r1d_d43m0n"];
    
            // Purchased Servers Array
            var phost = ns.getPurchasedServers();
    
            var i;
            var j;
    
            // Attempt to kill processes (for new targets)
            var update = false;
            var debug = false;
    
            
            if (update == true) { ns.tprintf("WARNING: UPDATE IS ENABLED.\nSCRIPT WILL END WITHOUT LOOPING."); }
    
            // Disable logging
    
            if (debug) {
                ns.disableLog("getServerMaxRam");
                ns.disableLog("getHackingLevel");
                ns.disableLog("getServerRequiredHackingLevel");
                ns.disableLog("getServerNumPortsRequired");
                ns.disableLog("scp");
                ns.disableLog("exec");
                ns.disableLog("kill");
                ns.disableLog("nuke");
            }
    
            // Purchased Servers
            if (update) {
                for (i=0; i < phost.length; i++) {
                    var phostRam = ns.getServerMaxRam(phost[i]);
                    var phostThreads = Math.floor(phostRam / scriptRam);
    
                    ns.print("Updating the script on: " + phost[i]);
                    await ns.scp(script, phost[i]);
                    await ns.kill(script, phost[i]);
                    await ns.exec(script, phost[i], phostThreads);
                    if (!ns.scriptRunning(script, phost[i])) { ns.print("ERROR: Script not running."); break; }
                }
            }
    
            // Remote Hosts
            for (j=0; j < host.length; j++) {
                try {
                    // Hostname
                    var ram = ns.getServerMaxRam(host[j]);
                    var threads = Math.floor(ram / scriptRam);
                
                    // Only execute if root access is True and if Server Exists and if Hacking Level is Right
                    if (ns.serverExists(host[j])) {
                        if (debug == true) { ns.print("Attempting to connect to: " + host[j]); }
                        if (!ns.hasRootAccess(host[j]) && !update) {
                            ns.print("Attempting to gain root access on " + host[j]);
    
                            // Figure out how many tools you need, then run them against the server to hack in
                            var tools = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPworm.exe", "SQLInject.exe"]
                            var numPorts = ns.getServerNumPortsRequired(host[j]);
    
                            var k = 0;
                            var toolCount = 0;
    
                            if (numPorts > 0) {
                                while (k <= (numPorts - 1)) {
                                    if (ns.fileExists(tools[k], "home")) {
                                        toolCount++;
    
                                        ns.print("Applying " + tools[k] + " on host.");
                                        if (tools[k] == tools[0]) { ns.brutessh(host[j]); }
                                        else if (tools[k] == tools[1]) { ns.ftpcrack(host[j]); }
                                        else if (tools[k] == tools[2]) { ns.relaysmtp(host[j]); }
                                        else if (tools[k] == tools[3]) { ns.httpworm(host[j]); }
                                        else if (tools[k] == tools[4]) { ns.sqlinject(host[j]); }
                                    } else { break; }
    
                                    k++;
                                }
                            }
                                            
                            if (toolCount >= numPorts) {
                                if (debug) {
                                    ns.tprintf("toolCount: " + toolCount);
                                    ns.tprintf("numPorts: " + numPorts);
                                    }
                                    
                                if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(host[j])) {
                                    // Hack server, if ya nasty
                                    if (!update) {
                                        if (debug) { ns.print("Attempting to nuke the host " + host[j]); } 
                                        ns.nuke(host[j]);
    
                                        }
                                    }
                                }
                            }
    
                            // Also copy the script to keep the servers updated.
                            if (ns.hasRootAccess(host[j])) {
                                if (
                                    Math.ceil(ns.getServerMaxRam(host[j])) > scriptRam) {
                                    if (debug) { ns.print(ns.getServerMaxRam(host[j])); }
                                    await ns.scp(script, host[j]);
                                    if (update) { if (ns.isRunning(script)) { ns.kill(script, host[j]); } }
                                    await ns.exec(script, host[j], threads);
                                    if (!ns.scriptRunning(script, host[j])) { ns.print("ERROR: Script not running."); break; }
                            }   
                        }
                            
                    }
                } catch (e) {ns.print("Host " + host[i] + " threw an error. Attempting to continue..."); j++;}
            }
    
        if (update) { break; }
    
        // Sleep for one second
        await ns.sleep(1000);
        }
    }