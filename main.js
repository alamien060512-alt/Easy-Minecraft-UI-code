import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

// ─────────────────────────────
// COMPASS TRIGGER
// ─────────────────────────────
world.afterEvents.itemUse.subscribe((event) => {
    const player = event.source;
    const item = event.itemStack;

    if (!item || item.typeId !== "minecraft:") return;

    showGamemodeMenu(player);
});

// ─────────────────────────────
// GAMEMODE MENU
// ─────────────────────────────
function showGamemodeMenu(player) {
    const form = new ActionFormData()
        .title("Gamemode")
        .button("Survival")
        .button("Creative")
        .button("Adventure");

    form.show(player).then((res) => {
        if (res.canceled) return;

        if (res.selection === 0) {
            player.runCommand("gamemode survival @s");
        }
        if (res.selection === 1) {
            player.runCommand("gamemode creative @s");
        }
        if (res.selection === 2) {
            player.runCommand("gamemode adventure @s");
        }
    });
}
