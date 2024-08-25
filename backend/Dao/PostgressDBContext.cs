using Microsoft.EntityFrameworkCore;
using ftDB.Entities;

/*
MIGRATING CHANGES TO DATABASE:

1. dotnet ef migrations add <migration name>

2. dotnet ef database update
*/

namespace ftDB.Dao
{
    public class PostgressDBContext(DbContextOptions<PostgressDBContext> options) : DbContext(options)
    {
        public virtual DbSet<Exercise> Exercises { get; set; }
        public virtual DbSet<Set> Sets { get; set; }
        public virtual DbSet<ExerciseInWorkout> ExercisesInWorkouts { get; set; }
        public virtual DbSet<CompletedWorkout> CompletedWorkouts { get; set; }
        public virtual DbSet<WorkoutTemplate> WorkoutTemplates { get; set; }
        public virtual DbSet<ExerciseTemplate> ExerciseTemplates { get; set; }
        public virtual DbSet<SetTemplate> SetTemplates { get; set; }
        public virtual DbSet<TemplateOrder> TemplateOrders { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Exercise>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");
                entity.ToTable("exercises");
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id").IsRequired();
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("timestamptz").HasColumnName("created_date").IsRequired();
                entity.Property(e => e.Name).HasColumnType("text").HasColumnName("name").IsRequired();
                entity.Property(e => e.Equipment).HasColumnType("text").HasColumnName("equipment").IsRequired();
                entity.Property(e => e.TargetMuscle).HasColumnType("text").HasColumnName("target_muscle").IsRequired();
                entity.Property(e => e.Uuid).HasColumnType("text").HasColumnName("uuid");
                entity.Property(e => e.IsHidden).HasColumnType("boolean").HasColumnName("is_hidden");
                entity.Property(e => e.HiddenForUuids).HasColumnType("text[]").HasColumnName("hidden_for_uuids").HasDefaultValue(Array.Empty<string>());
                entity.HasGeneratedTsVectorColumn
                (
                    p => p.SearchVector,
                    "english",  // Text search config
                    p => new { p.Equipment, p.Name, p.TargetMuscle }  // Included properties
                ).HasIndex(p => p.SearchVector).HasMethod("GIN"); // Index method on the search vector (GIN or GIST)
                entity.HasMany(Exercise => Exercise.ExerciseInWorkout)
                      .WithOne(ExerciseInWorkout => ExerciseInWorkout.Exercise)
                      .HasForeignKey(ExerciseInWorkout => ExerciseInWorkout.ExerciseId)
                      .OnDelete(DeleteBehavior.Cascade); // Deleting an exercise deletes all related ExerciseInWorkout, 
                                                         // which also deletes all sets relating to ExerciseInWorkout
                entity.HasMany(Exercise => Exercise.ExerciseTemplate)
                      .WithOne(ExerciseTemplate => ExerciseTemplate.Exercise)
                      .HasForeignKey(ExerciseTemplate => ExerciseTemplate.ExerciseId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<Set>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("sets");
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id").IsRequired();
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("timestamptz").HasColumnName("created_date").IsRequired();
                entity.Property(e => e.Weight).HasColumnType("double precision").HasColumnName("weight").IsRequired();
                entity.Property(e => e.Reps).HasColumnType("integer").HasColumnName("reps").IsRequired();
                entity.Property(e => e.SetNumber).HasColumnType("integer").HasColumnName("set_number").IsRequired();
                entity.Property(e => e.ExerciseInWorkoutId).HasColumnType("integer").HasColumnName("exercise_in_workout_id").IsRequired();
                entity.HasOne(Set => Set.ExerciseInWorkout)
                      .WithMany(ExerciseInWorkout => ExerciseInWorkout.Sets)
                      .HasForeignKey(e => e.ExerciseInWorkoutId);
            });

            builder.Entity<ExerciseInWorkout>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("exercises_in_workout");
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id").IsRequired();
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("timestamptz").HasColumnName("created_date").IsRequired();
                entity.Property(e => e.ExerciseId).HasColumnType("integer").HasColumnName("exercise_id").IsRequired();
                entity.Property(e => e.CompletedWorkoutId).HasColumnType("integer").HasColumnName("completed_workout_id").IsRequired();
                entity.Property(e => e.Notes).HasColumnType("text").HasColumnName("notes").IsRequired();
                entity.Property(e => e.WeightUnit).HasColumnType("text").HasColumnName("weight_unit").IsRequired();
                entity.Property(e => e.InsertionNumber).HasColumnType("integer").HasColumnName("insertion_number").IsRequired();
                entity.HasOne(ExerciseInWorkout => ExerciseInWorkout.CompletedWorkout)
                      .WithMany(CompletedWorkout => CompletedWorkout.ExercisesInWorkout)
                      .HasForeignKey(ExerciseInWorkout => ExerciseInWorkout.CompletedWorkoutId);
                entity.HasOne(ExerciseInWorkout => ExerciseInWorkout.Exercise)
                      .WithMany(Exercise => Exercise.ExerciseInWorkout)
                      .HasForeignKey(ExerciseInWorkout => ExerciseInWorkout.ExerciseId);
                entity.HasMany(ExerciseInWorkout => ExerciseInWorkout.Sets)
                      .WithOne(Set => Set.ExerciseInWorkout)
                      .HasForeignKey(Set => Set.ExerciseInWorkoutId)
                      .OnDelete(DeleteBehavior.Cascade); // Deleting an ExerciseInWorkout deletes related sets
            });

            builder.Entity<CompletedWorkout>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("completed_workouts");
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id").IsRequired();
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("timestamptz").HasColumnName("created_date").IsRequired();
                entity.Property(e => e.Duration).HasColumnType("integer").HasColumnName("duration").IsRequired();
                entity.Property(e => e.Name).HasColumnType("text").HasColumnName("name").IsRequired();
                entity.Property(e => e.Date).HasColumnType("timestamptz").HasColumnName("date").IsRequired();
                entity.Property(e => e.StartTime).HasColumnType("timestamptz").HasColumnName("start_time").IsRequired();
                entity.Property(e => e.EndTime).HasColumnType("timestamptz").HasColumnName("end_time").IsRequired();
                entity.Property(e => e.Uuid).HasColumnType("text").HasColumnName("uuid");
                entity.Property(e => e.Volume).HasColumnType("double precision").HasColumnName("volume").IsRequired();
                entity.HasMany(CompletedWorkout => CompletedWorkout.ExercisesInWorkout)
                      .WithOne(ExerciseInWorkout => ExerciseInWorkout.CompletedWorkout)
                      .HasForeignKey(ExerciseInWorkout => ExerciseInWorkout.CompletedWorkoutId)
                      .OnDelete(DeleteBehavior.Cascade); // Deleting a CompletedWorkout deletes all related ExercisesInWorkout and Sets
            });

            builder.Entity<SetTemplate>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("set_templates");
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id").IsRequired();
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("timestamptz").HasColumnName("created_date").IsRequired();
                entity.Property(e => e.Weight).HasColumnType("double precision").HasColumnName("weight").IsRequired();
                entity.Property(e => e.Reps).HasColumnType("integer").HasColumnName("reps").IsRequired();
                entity.Property(e => e.SetNumber).HasColumnType("integer").HasColumnName("set_number").IsRequired();
                entity.Property(e => e.ExerciseTemplateId).HasColumnType("integer").HasColumnName("exercise_template_id").IsRequired();
                entity.HasOne(Set => Set.ExerciseTemplate)
                      .WithMany(ExerciseTemplate => ExerciseTemplate.SetTemplates)
                      .HasForeignKey(e => e.ExerciseTemplateId);
            });

            builder.Entity<ExerciseTemplate>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("exercise_templates");
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id").IsRequired();
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("timestamptz").HasColumnName("created_date").IsRequired();
                entity.Property(e => e.ExerciseId).HasColumnType("integer").HasColumnName("exercise_id").IsRequired();
                entity.Property(e => e.WorkoutTemplateId).HasColumnType("integer").HasColumnName("workout_template_id").IsRequired();
                entity.Property(e => e.Notes).HasColumnType("text").HasColumnName("notes").IsRequired();
                entity.Property(e => e.WeightUnit).HasColumnType("text").HasColumnName("weight_unit").IsRequired();
                entity.Property(e => e.InsertionNumber).HasColumnType("integer").HasColumnName("insertion_number").IsRequired();
                entity.HasOne(ExerciseTemplate => ExerciseTemplate.WorkoutTemplate)
                      .WithMany(WorkoutTemplate => WorkoutTemplate.ExerciseTemplates)
                      .HasForeignKey(ExerciseTemplate => ExerciseTemplate.WorkoutTemplateId);
                entity.HasOne(ExerciseTemplate => ExerciseTemplate.Exercise)
                      .WithMany(Exercise => Exercise.ExerciseTemplate)
                      .HasForeignKey(ExerciseTemplate => ExerciseTemplate.ExerciseId);
                entity.HasMany(ExerciseTemplate => ExerciseTemplate.SetTemplates)
                      .WithOne(SetTemplate => SetTemplate.ExerciseTemplate)
                      .HasForeignKey(SetTemplate => SetTemplate.ExerciseTemplateId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<WorkoutTemplate>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("workout_templates");
                entity.Property(e => e.Uuid).HasColumnType("text").HasColumnName("uuid");
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id").IsRequired();
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnType("timestamptz").HasColumnName("created_date").IsRequired();
                entity.Property(e => e.Name).HasColumnType("text").HasColumnName("name").IsRequired();
                entity.HasMany(WorkoutTemplate => WorkoutTemplate.ExerciseTemplates)
                      .WithOne(ExerciseTemplate => ExerciseTemplate.WorkoutTemplate)
                      .HasForeignKey(ExerciseTemplate => ExerciseTemplate.WorkoutTemplateId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<TemplateOrder>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("template_orders");
                entity.Property(e => e.Uuid).HasColumnType("text").HasColumnName("uuid").IsRequired();
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id").IsRequired();
                entity.Property(e => e.TemplateIds).HasColumnType("integer[]").HasColumnName("template_ids").IsRequired();
            });

            builder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("users");
                entity.Property(e => e.Uuid).HasColumnType("text").HasColumnName("uuid").IsRequired();
                entity.Property(e => e.Id).HasColumnType("integer").HasColumnName("id").IsRequired();
                entity.Property(e => e.TotalWorkouts).HasColumnType("integer").HasColumnName("total_workout_count").IsRequired();
                entity.Property(e => e.TotalVolume).HasColumnType("double precision").HasColumnName("total_workout_volume").IsRequired();
                entity.Property(e => e.TotalTime).HasColumnType("integer").HasColumnName("total_workout_time").IsRequired();
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