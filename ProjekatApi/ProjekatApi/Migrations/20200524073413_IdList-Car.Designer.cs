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
    [Migration("20200524073413_IdList-Car")]
    partial class IdListCar
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.0-preview.3.20181.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ProjekatApi.Model.Car", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AirConditioning")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Bags")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CarCompanyId")
                        .HasColumnType("int");

                    b.Property<string>("Door")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fuel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gearshift")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HourlyRent")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdList")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageCar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mark")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RentPerDay")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Seat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("YearProduction")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CarCompanyId");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("ProjekatApi.Model.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("Companies");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Company");
                });

            modelBuilder.Entity("ProjekatApi.Model.Destination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AircompanyId")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("AircompanyId");

                    b.HasIndex("City")
                        .IsUnique()
                        .HasFilter("[City] IS NOT NULL");

                    b.ToTable("Destinations");
                });

            modelBuilder.Entity("ProjekatApi.Model.Flight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AircompanyId")
                        .HasColumnType("int");

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

                    b.HasIndex("AircompanyId");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("ProjekatApi.Model.FlightDestination", b =>
                {
                    b.Property<int>("DestinationId")
                        .HasColumnType("int");

                    b.Property<int>("FlightId")
                        .HasColumnType("int");

                    b.HasKey("DestinationId", "FlightId");

                    b.HasIndex("FlightId");

                    b.ToTable("FlightDestinations");
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

            modelBuilder.Entity("ProjekatApi.Model.Aircompany", b =>
                {
                    b.HasBaseType("ProjekatApi.Model.Company");

                    b.HasDiscriminator().HasValue("Aircompany");
                });

            modelBuilder.Entity("ProjekatApi.Model.CarCompany", b =>
                {
                    b.HasBaseType("ProjekatApi.Model.Company");

                    b.HasDiscriminator().HasValue("CarCompany");
                });

            modelBuilder.Entity("ProjekatApi.Model.Car", b =>
                {
                    b.HasOne("ProjekatApi.Model.CarCompany", "CarCompany")
                        .WithMany("Cars")
                        .HasForeignKey("CarCompanyId");
                });

            modelBuilder.Entity("ProjekatApi.Model.Destination", b =>
                {
                    b.HasOne("ProjekatApi.Model.Aircompany", null)
                        .WithMany("Destinations")
                        .HasForeignKey("AircompanyId");
                });

            modelBuilder.Entity("ProjekatApi.Model.Flight", b =>
                {
                    b.HasOne("ProjekatApi.Model.Aircompany", null)
                        .WithMany("Flights")
                        .HasForeignKey("AircompanyId");
                });

            modelBuilder.Entity("ProjekatApi.Model.FlightDestination", b =>
                {
                    b.HasOne("ProjekatApi.Model.Destination", "Destination")
                        .WithMany("FlightDestinations")
                        .HasForeignKey("DestinationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ProjekatApi.Model.Flight", "Flight")
                        .WithMany("FlightDestinations")
                        .HasForeignKey("FlightId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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
