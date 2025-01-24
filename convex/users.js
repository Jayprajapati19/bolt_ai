import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const GetUser = query({
  args: {
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.email) return null;

    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
  },
});

export const CreateUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    picture: v.string(),
    userId: v.string(), // matches with uid from Google auth
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      picture: args.picture,
      userId: args.userId,
      createdAt: new Date().toISOString(),
    });
  },
});
