import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create Workspace
export const CreateWorkSpace = mutation({
  args: {
    messages: v.any(),
    userId: v.id("users"), // Ensures `userId` references the `users` collection
  },
  handler: async (ctx, args) => {
    if (!args.userId || !args.messages) {
      throw new Error("Missing required fields: userId or messages");
    }

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

// Get Workspace
export const GetWorkSpace = query({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.workspaceId);
    return result;
  },
});

// Update Messages in Workspace
export const UpdateMessages = mutation({
  args: {
    workspaceId: v.id("workspace"),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      messages: args.messages,
    });
    return result;
  },
});

// Update Files in Workspace
export const UpdateFiles = mutation({
  args: {
    workspaceId: v.id("workspace"),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      fileData: args.files,
    });
    return result;
  },
});

// Get All Workspaces for a User
export const GetAllWorkspaces = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("workspace")
      .filter((q) => q.eq(q.field("user"), args.userId))
      .collect();

    return result;
  },
});
