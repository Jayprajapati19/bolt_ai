import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create Workspace
export const CreateWorkSpace = mutation({
  args: {
    messages: v.any(),
    userId: v.string(), // Change from v.id("users") to v.string()
  },
  handler: async (ctx, args) => {
    if (!args.userId || !args.messages) {
      throw new Error("Missing required fields: userId or messages");
    }

    // Try finding user by both userId and uid fields
    const user = await ctx.db
      .query("users")
      .filter((q) => 
        q.or(
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("email"), args.email)
        )
      )
      .first();

    if (!user) {
      console.error("Failed to find user:", args.userId);
      throw new Error(`User not found with ID: ${args.userId}`);
    }

    const workspaceId = await ctx.db.insert("workspace", {
      messages: args.messages,
      user: user._id,
      userId: args.userId, // Store userId in workspace too
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
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace) return null;
    return {
      ...workspace,
      _id: args.workspaceId, // Ensure ID is included
    };
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
    userId: v.string(), // Change from v.id("users") to v.string()
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!user) return [];

    const workspaces = await ctx.db
      .query("workspace")
      .filter((q) => q.eq(q.field("user"), user._id))
      .collect();

    return workspaces.map((workspace) => ({
      ...workspace,
      userId: args.userId,
    }));
  },
});
