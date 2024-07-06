﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using NpgsqlTypes;
using ftDB.Dao;

#nullable disable

namespace FitnessTrackerBackEnd.Migrations
{
    [DbContext(typeof(PostgressDBContext))]
    partial class PostgressDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ftDB.Entities.CompletedWorkout", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamptz")
                        .HasColumnName("created_date")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamptz")
                        .HasColumnName("date");

                    b.Property<int>("Duration")
                        .HasColumnType("integer")
                        .HasColumnName("duration");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("timestamptz")
                        .HasColumnName("end_time");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("timestamptz")
                        .HasColumnName("start_time");

                    b.HasKey("Id");

                    b.ToTable("completed_workouts", (string)null);
                });

            modelBuilder.Entity("ftDB.Entities.Exercise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamptz")
                        .HasColumnName("created_date")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("Equipment")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("equipment");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<NpgsqlTsVector>("SearchVector")
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("tsvector")
                        .HasAnnotation("Npgsql:TsVectorConfig", "english")
                        .HasAnnotation("Npgsql:TsVectorProperties", new[] { "Equipment", "Name", "TargetMuscle" });

                    b.Property<string>("TargetMuscle")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("target_muscle");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex("SearchVector");

                    NpgsqlIndexBuilderExtensions.HasMethod(b.HasIndex("SearchVector"), "GIN");

                    b.ToTable("exercises", (string)null);
                });

            modelBuilder.Entity("ftDB.Entities.ExerciseInWorkout", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CompletedWorkoutId")
                        .HasColumnType("integer")
                        .HasColumnName("completed_workout_id");

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamptz")
                        .HasColumnName("created_date")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<int>("ExerciseId")
                        .HasColumnType("integer")
                        .HasColumnName("exercise_id");

                    b.Property<int>("InsertionNumber")
                        .HasColumnType("integer")
                        .HasColumnName("insertion_number");

                    b.Property<string>("Notes")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("notes");

                    b.Property<string>("WeightUnit")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("weight_unit");

                    b.HasKey("Id");

                    b.HasIndex("CompletedWorkoutId");

                    b.HasIndex("ExerciseId");

                    b.ToTable("exercises_in_workout", (string)null);
                });

            modelBuilder.Entity("ftDB.Entities.ExerciseTemplate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamptz")
                        .HasColumnName("created_date")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<int>("ExerciseId")
                        .HasColumnType("integer")
                        .HasColumnName("exercise_id");

                    b.Property<int>("InsertionNumber")
                        .HasColumnType("integer")
                        .HasColumnName("insertion_number");

                    b.Property<string>("Notes")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("notes");

                    b.Property<string>("WeightUnit")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("weight_unit");

                    b.Property<int>("WorkoutTemplateId")
                        .HasColumnType("integer")
                        .HasColumnName("workout_template_id");

                    b.HasKey("Id");

                    b.HasIndex("ExerciseId");

                    b.HasIndex("WorkoutTemplateId");

                    b.ToTable("exercise_templates", (string)null);
                });

            modelBuilder.Entity("ftDB.Entities.Set", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamptz")
                        .HasColumnName("created_date")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<int>("ExerciseInWorkoutId")
                        .HasColumnType("integer")
                        .HasColumnName("exercise_in_workout_id");

                    b.Property<int>("Reps")
                        .HasColumnType("integer")
                        .HasColumnName("reps");

                    b.Property<int>("SetNumber")
                        .HasColumnType("integer")
                        .HasColumnName("set_number");

                    b.Property<int>("Weight")
                        .HasColumnType("integer")
                        .HasColumnName("weight");

                    b.HasKey("Id");

                    b.HasIndex("ExerciseInWorkoutId");

                    b.ToTable("sets", (string)null);
                });

            modelBuilder.Entity("ftDB.Entities.SetTemplate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamptz")
                        .HasColumnName("created_date")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<int>("ExerciseTemplateId")
                        .HasColumnType("integer")
                        .HasColumnName("exercise_template_id");

                    b.Property<int>("Reps")
                        .HasColumnType("integer")
                        .HasColumnName("reps");

                    b.Property<int>("SetNumber")
                        .HasColumnType("integer")
                        .HasColumnName("set_number");

                    b.Property<int>("Weight")
                        .HasColumnType("integer")
                        .HasColumnName("weight");

                    b.HasKey("Id");

                    b.HasIndex("ExerciseTemplateId");

                    b.ToTable("set_templates", (string)null);
                });

            modelBuilder.Entity("ftDB.Entities.WorkoutTemplate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamptz")
                        .HasColumnName("created_date")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("workout_templates", (string)null);
                });

            modelBuilder.Entity("ftDB.Entities.ExerciseInWorkout", b =>
                {
                    b.HasOne("ftDB.Entities.CompletedWorkout", "CompletedWorkout")
                        .WithMany("ExercisesInWorkout")
                        .HasForeignKey("CompletedWorkoutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ftDB.Entities.Exercise", "Exercise")
                        .WithMany("ExerciseInWorkout")
                        .HasForeignKey("ExerciseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CompletedWorkout");

                    b.Navigation("Exercise");
                });

            modelBuilder.Entity("ftDB.Entities.ExerciseTemplate", b =>
                {
                    b.HasOne("ftDB.Entities.Exercise", "Exercise")
                        .WithMany("ExerciseTemplate")
                        .HasForeignKey("ExerciseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ftDB.Entities.WorkoutTemplate", "WorkoutTemplate")
                        .WithMany("ExerciseTemplates")
                        .HasForeignKey("WorkoutTemplateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Exercise");

                    b.Navigation("WorkoutTemplate");
                });

            modelBuilder.Entity("ftDB.Entities.Set", b =>
                {
                    b.HasOne("ftDB.Entities.ExerciseInWorkout", "ExerciseInWorkout")
                        .WithMany("Sets")
                        .HasForeignKey("ExerciseInWorkoutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ExerciseInWorkout");
                });

            modelBuilder.Entity("ftDB.Entities.SetTemplate", b =>
                {
                    b.HasOne("ftDB.Entities.ExerciseTemplate", "ExerciseTemplate")
                        .WithMany("SetTemplates")
                        .HasForeignKey("ExerciseTemplateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ExerciseTemplate");
                });

            modelBuilder.Entity("ftDB.Entities.CompletedWorkout", b =>
                {
                    b.Navigation("ExercisesInWorkout");
                });

            modelBuilder.Entity("ftDB.Entities.Exercise", b =>
                {
                    b.Navigation("ExerciseInWorkout");

                    b.Navigation("ExerciseTemplate");
                });

            modelBuilder.Entity("ftDB.Entities.ExerciseInWorkout", b =>
                {
                    b.Navigation("Sets");
                });

            modelBuilder.Entity("ftDB.Entities.ExerciseTemplate", b =>
                {
                    b.Navigation("SetTemplates");
                });

            modelBuilder.Entity("ftDB.Entities.WorkoutTemplate", b =>
                {
                    b.Navigation("ExerciseTemplates");
                });
#pragma warning restore 612, 618
        }
    }
}
