import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to Get User by Email
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

// Mutation to Create User
export const CreateUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    picture: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      return {
        ...existingUser,
        userId: existingUser.userId || existingUser.uid,
      };
    }

    const newUser = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      picture: args.picture,
      userId: args.userId, // Store userId directly
      createdAt: new Date().toISOString(),
    });

    return {
      ...newUser,
      userId: args.userId,
    };
  },
});
