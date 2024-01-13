using Microsoft.EntityFrameworkCore;
using ftDB.Entities;

namespace ftDB.Dao
{
    public class PostgressDBContext(DbContextOptions<PostgressDBContext> options) : DbContext(options)
    {
        public virtual DbSet<Exercise> All_Exercises { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Exercise>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");
                entity.ToTable("all_exercises");
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id");
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("timestamp with timezone").HasColumnName("created_date");
                entity.Property(e => e.Name).HasColumnType("text").HasColumnName("name");
                entity.Property(e => e.Equipment).HasColumnType("text").HasColumnName("equipment");
                entity.Property(e => e.TargetMuscle).HasColumnType("text").HasColumnName("target_muscle");
            });
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        { }
    }
}