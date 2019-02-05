import { h } from "preact"
import { renderToString } from "react-dom/server"

// import getRoutes, { createNewStore } from '../../app/routes'


export default async function(ctx, next) {
  await ctx.render("index", {
    // mainContent,
    // headerContent,
    // state: JSON.stringify(state),
    // videoPlayer: globalPlayer,
    scripts: ctx.resources.scripts,
    styles: ctx.resources.styles,
    styleSheets: ctx.resources.styleSheets,
    // head: head,
    // isBot: state.isBot,
    // bot: ctx.query.bot
  })
}