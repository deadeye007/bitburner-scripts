/** @param {NS} ns **/
export async function main(ns) {
	var host = ["n00dles", "zer0", "CSEC", "neo-net", "the-hub", "catalyst", "I.I.I.I", "millenium-fitness", "aerocorp", "unitalife", "solaris", "infocomm", "taiyang-digital", "crush-fitness", "rothman-uni", "lexo-corp", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "max-hardware", "phantasy", "comptek", "syscore", "alpha-ent", "galactic-cyber", "omnia", "defcomm", "zeus-med", "global-pharm", "snap-fitness", "deltaone", "icarus", "univ-energy", "zb-def", "nova-med", "netlink", "avmnite-02h", "zb-institute", "omega-net", "iron-gym", "nectar-net", "silver-helix", "johnson-ortho", "summit-uni", "rho-construction", "aevum-police", "darkweb", "microdyne", "run4theh111z", "titan-labs", "vitalife", "applied-energetics", "fulcrumtech", "stormtech", "helios", "omnitek", "b-and-a", "megacorp", "4sigma", "clarkinc", "powerhouse-fitness", "ecorp", "kuai-gong", "blade", ".", "nwo", "fulcrumassets", "The-Cave", "w0r1d_d43m0n"]
	var i;

	for (i=0; i < host.length; i++) {
		if ((ns.getServerRequiredHackingLevel(host[i]) <= ns.getHackingLevel()) && ns.hasRootAccess(host[i])) {

			var serverHackLvl = ns.getServerRequiredHackingLevel(host[i])
			var serverMoneyMax = Math.floor((ns.getServerMaxMoney(host[i]) / 1000000000))
			var serverMoneyCur = Math.floor((ns.getServerMoneyAvailable(host[i]) / 1000000000))
			if (serverMoneyMax > 0) { ns.tprintf(host[i] + " | Current Money: $" + serverMoneyCur + "b | Max Money: $" + serverMoneyMax + "b | Hack Level: " + serverHackLvl); }
		}
	}
}