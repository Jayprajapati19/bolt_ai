import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateWorkSpace = mutation({
  args: {
    messages: v.any(),
    userId: v.string(), // Changed from v.id("users") to v.string()
  },
  handler: async (ctx, args) => {
    // Get or create user
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const workspaceId = await ctx.db.insert("workspace", {
      messages: args.messages,
      user: user._id,
      createdAt: new Date().toISOString(),
    });

    return workspaceId;
  },
});

export const GetWorkSpace = query({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.workspaceId);
    return result;
  },
});

export const GetAllWorkspace = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!user) {
      return [];
    }

    const workspaces = await ctx.db
      .query("workspace")
      .filter((q) => q.eq(q.field("user"), user._id))
      .order("desc")
      .collect();

    return workspaces;
  },
});
