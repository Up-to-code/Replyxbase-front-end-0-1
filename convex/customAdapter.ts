import { type Adapter } from "better-auth/types";
import { DataModel } from "./_generated/dataModel";

const mapDoc = (doc: any) => {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id, ...rest };
};

export const customAdapter = (ctx: any): Adapter => {
  return {
    id: "convex-custom",
    create: async ({ model, data }) => {
      const id = await ctx.db.insert(model as any, data);
      return { id, ...data } as any;
    },
    findOne: async ({ model, where }) => {
      const records = await ctx.db.query(model as any).collect();
      const record = records.find((r: any) => {
        return Object.entries(where).every(([k, v]) => {
          const field = k === "id" ? "_id" : k;
          return r[field] === v;
        });
      });
      return mapDoc(record);
    },
    findMany: async ({ model, where, limit, offset, sortBy }) => {
      let records = await ctx.db.query(model as any).collect();
      
      if (where) {
        records = records.filter((r: any) => {
          return Object.entries(where).every(([k, v]) => {
            const field = k === "id" ? "_id" : k;
            return r[field] === v;
          });
        });
      }
      
      if (sortBy) {
        records.sort((a: any, b: any) => {
          const field = sortBy.field === "id" ? "_id" : sortBy.field;
          const dir = sortBy.direction === "desc" ? -1 : 1;
          return a[field] > b[field] ? dir : -dir;
        });
      }
      
      if (offset) records = records.slice(offset);
      if (limit) records = records.slice(0, limit);
      
      return records.map(mapDoc) as any;
    },
    update: async ({ model, where, update }) => {
      const records = await ctx.db.query(model as any).collect();
      const record = records.find((r: any) => {
        return Object.entries(where).every(([k, v]) => {
           const field = k === "id" ? "_id" : k;
           return r[field] === v;
        });
      });

      if (!record) return null;
      
      await ctx.db.patch(record._id, update);
      return mapDoc({ ...record, ...update });
    },
    delete: async ({ model, where }) => {
      const records = await ctx.db.query(model as any).collect();
      const record = records.find((r: any) => {
        return Object.entries(where).every(([k, v]) => {
           const field = k === "id" ? "_id" : k;
           return r[field] === v;
        });
      });
        
      if (record) {
        await ctx.db.delete(record._id);
      }
    },
    deleteMany: async ({ model, where }) => {
      const records = await ctx.db.query(model as any).collect();
      const toDelete = records.filter((r: any) => {
        if (!where) return true;
        return Object.entries(where).every(([k, v]) => {
           const field = k === "id" ? "_id" : k;
           return r[field] === v;
        });
      });
        
      await Promise.all(toDelete.map((r: any) => ctx.db.delete(r._id)));
      return toDelete.length;
    },
    count: async ({ model, where }) => {
      const records = await ctx.db.query(model as any).collect();
      const filtered = records.filter((r: any) => {
        if (!where) return true;
        return Object.entries(where).every(([k, v]) => {
           const field = k === "id" ? "_id" : k;
           return r[field] === v;
        });
      });
      return filtered.length;
    },
    updateMany: async ({ model, where, update }) => {
      const records = await ctx.db.query(model as any).collect();
      const toUpdate = records.filter((r: any) => {
        if (!where) return true;
        return Object.entries(where).every(([k, v]) => {
           const field = k === "id" ? "_id" : k;
           return r[field] === v;
        });
      });
      
      await Promise.all(toUpdate.map((r: any) => ctx.db.patch(r._id, update)));
      return toUpdate.length;
    },
    transaction: async (fn) => {
      // Convex mutations are already transactional
      return fn(customAdapter(ctx));
    }
  };
};
