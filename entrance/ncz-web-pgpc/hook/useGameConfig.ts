export const useGameConfig = () => {
  const options = {
    RECENT: { icon: 'recent-icon', title: 'in_recent_game', type: 'RECENT' },
    popular: { icon: 'hot-icon', title: 'popular_nav', type: 'HOT' },

    // ELOTT
    lottery: { icon: 'lottery-icon', title: 'label_lottery', type: 'lottery' },

    HOME: { icon: 'rng-icon', title: 'local_lobby', type: 'HOME' },
    FAV: { icon: 'rng-icon', title: 'local_fav', type: 'FAV' },
    RNG: { icon: 'rng-icon', title: 'con_rng', type: 'RNG' },
    LIVE: { icon: 'live-icon', title: 'con_live', type: 'LIVE' },
    FISH: { icon: 'fish-icon', title: 'con_fish', type: 'FISH' },
    SPORTS: { icon: 'sports-icon', title: 'con_sports', type: 'SPORTS' },
    ESPORTS: { icon: 'sports-icon', title: 'compete_game', type: 'ESPORTS' },
    PVP: { icon: 'pvp-icon', title: 'pvp_promo', type: 'PVP' },
    COCKFIGHT: { icon: 'pvp-icon', title: 'in_cockfight_nav', type: 'COCKFIGHT' },
    SPB: { icon: 'blockchain-icon', title: 'local_block', type: 'SPB' },
  }

  return { options }
}

/**
{
  "RECENT": {
    "icon": "recent-icon",
    "title": "Recent Game",
    "list": [],
    "type": "RECENT"
  },
  "HOT": {
    "icon": "hot-icon",
    "title": "Hot Games",
    "list": [],
    "type": "HOT"
  },
  "HOME": {
    "icon": "hot-icon",
    "title": "Popular",
    "type": "HOME"
  },
  "FAV": {
    "icon": "rng-icon",
    "title": "Favorite",
    "list": [],
    "type": "FAV"
  },
  "GAMES": [],
  "RNG": {
    "icon": "rng-icon",
    "title": "Slots",
    "list": [],
    "type": "RNG"
  },
  "LIVE": {
    "icon": "live-icon",
    "title": "Live",
    "list": [],
    "type": "LIVE"
  },
  "FISH": {
    "icon": "fish-icon",
    "title": "Fish",
    "list": [],
    "type": "FISH"
  },
  "SPORTS": {
    "icon": "sports-icon",
    "title": "Sports",
    "list": [],
    "type": "SPORTS"
  },
  "ESPORTS": {
    "icon": "sports-icon",
    "title": "E-Sports",
    "list": [],
    "type": "ESPORTS"
  },
  "PVP": {
    "icon": "pvp-icon",
    "title": "Cards",
    "list": [],
    "type": "PVP"
  },
  "ELOTT": {
    "icon": "lottery-icon",
    "title": "Lottery",
    "list": [],
    "type": "ELOTT"
  },
  "COCKFIGHT": {
    "icon": "cockfight-icon",
    "title": "Cockfight",
    "list": [],
    "type": "COCKFIGHT"
  },
  "RUMMY": {
    "icon": "rummy-icon",
    "title": "Rummy",
    "type": "RUMMY"
  },
  "LUDO": {
    "icon": "ludo-icon",
    "title": "Ludo",
    "type": "LUDO"
  },
  "SPB": {
    "icon": "blockchain-icon",
    "title": "local_block",
    "type": "SPB"
  }
}
 */
