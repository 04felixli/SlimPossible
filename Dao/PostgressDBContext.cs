using Microsoft.EntityFrameworkCore;
using ftDB.Entities;

namespace ftDB.Dao
{
    public class PostgressDBContext(DbContextOptions<PostgressDBContext> options) : DbContext(options)
    {
        public virtual DbSet<Exercise> Exercises { get; set; }
        public virtual DbSet<Set> Sets { get; set; }
        public virtual DbSet<ExerciseInWorkout> ExercisesInWorkouts { get; set; }
        public virtual DbSet<CompletedWorkout> CompletedWorkouts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Exercise>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");
                entity.ToTable("exercises");
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id");
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("timestamp").HasColumnName("created_date");
                entity.Property(e => e.Name).HasColumnType("text").HasColumnName("name");
                entity.Property(e => e.Equipment).HasColumnType("text").HasColumnName("equipment");
                entity.Property(e => e.TargetMuscle).HasColumnType("text").HasColumnName("target_muscle");
                entity.HasGeneratedTsVectorColumn
                (
                    p => p.SearchVector,
                    "english",  // Text search config
                    p => new { p.Equipment, p.Name, p.TargetMuscle }  // Included properties
                ).HasIndex(p => p.SearchVector).HasMethod("GIN"); // Index method on the search vector (GIN or GIST)
            });

            builder.Entity<Set>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("sets");
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id");
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("timestamp").HasColumnName("created_date");
                entity.Property(e => e.Weight).HasColumnType("integer").HasColumnName("weight");
                entity.Property(e => e.Reps).HasColumnType("integer").HasColumnName("reps");
                entity.Property(e => e.SetNumber).HasColumnType("integer").HasColumnName("set_number");
                entity.Property(e => e.ExerciseInWorkoutId).HasColumnType("integer").HasColumnName("exercise_in_workout_id");
            });

            builder.Entity<ExerciseInWorkout>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("exercises_in_workout");
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id");
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("timestamp").HasColumnName("created_date");
                entity.Property(e => e.ExerciseId).HasColumnType("integer").HasColumnName("exercise_id");
                entity.Property(e => e.WorkoutId).HasColumnType("integer").HasColumnName("completed_workout_id");
                entity.Property(e => e.Notes).HasColumnType("text").HasColumnName("notes");
                entity.Property(e => e.WeightUnit).HasColumnType("text").HasColumnName("weight_unit");
            });

            builder.Entity<CompletedWorkout>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("completed_workouts");
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id");
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("timestamp").HasColumnName("created_date");
                entity.Property(e => e.Duration).HasColumnType("integer").HasColumnName("duration");
                entity.Property(e => e.Name).HasColumnType("text").HasColumnName("name");
                entity.Property(e => e.Date).HasColumnType("timestamp").HasColumnName("date");
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