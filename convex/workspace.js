import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateWorkspace = mutation({
  args: {
    messages: v.any(),
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      message: args.messages,
      user: args.user,
    });
    return workspaceId;
  },
});

export const GetWorkspace = query({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.workspaceId);
    return result;
  },
});

export const UpadateMessages = mutation({
  args: {
    workspaceId: v.id("workspace"),
    // messages: v.any(),
    message: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      // messages: args.messages,
      message: args.message,
    });
    return result;
  },
});

export const UpadateFiles = mutation({
  args: {
    workspaceId: v.id("workspace"),
    // messages: v.any(),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      // messages: args.messages,
      fileData: args.files,
    });
    return result;
  },
});

export const GetAllWorkspace=query({
  args: {
    userId:v.id('users')
  },
  handler:async(ctx,args)=>{
    const result=await ctx.db.query('workspace')
    .filter(q=>q.eq(q.field('user'),args.userId))
    .collect();

    return result;
  }
})