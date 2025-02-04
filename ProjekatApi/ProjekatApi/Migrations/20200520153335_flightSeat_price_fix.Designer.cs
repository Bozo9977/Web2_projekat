﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProjekatApi;

namespace ProjekatApi.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20200520153335_flightSeat_price_fix")]
    partial class flightSeat_price_fix
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.0-preview.3.20181.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ProjekatApi.Model.Destination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("FlightId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FlightId");

                    b.ToTable("Destinations");
                });

            modelBuilder.Entity("ProjekatApi.Model.Flight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Arrival")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Departure")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Length")
                        .HasColumnType("int");

                    b.Property<DateTime>("TakeOff")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("TouchDown")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("ProjekatApi.Model.FlightSeat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Class")
                        .HasColumnType("int");

                    b.Property<int?>("FlightId")
                        .HasColumnType("int");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<bool>("Reserved")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("FlightId");

                    b.ToTable("FlightSeats");

                    b.HasCheckConstraint("CK_FlightSeats_Class_Enum_Constraint", "[Class] IN(0, 1, 2)");
                });

            modelBuilder.Entity("ProjekatApi.Model.Destination", b =>
                {
                    b.HasOne("ProjekatApi.Model.Flight", null)
                        .WithMany("Connections")
                        .HasForeignKey("FlightId");
                });

            modelBuilder.Entity("ProjekatApi.Model.FlightSeat", b =>
                {
                    b.HasOne("ProjekatApi.Model.Flight", "Flight")
                        .WithMany("Seats")
                        .HasForeignKey("FlightId");
                });
#pragma warning restore 612, 618
        }
    }
}
