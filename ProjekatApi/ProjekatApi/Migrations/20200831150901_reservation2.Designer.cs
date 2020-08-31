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
    [Migration("20200831150901_reservation2")]
    partial class reservation2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.0-preview.3.20181.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ProjekatApi.Model.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(150)");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(150)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(150)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ApplicationUser");
                });

            modelBuilder.Entity("ProjekatApi.Model.BranchOffices", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Id_companyId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telephone")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Id_companyId");

                    b.ToTable("BranchOffices");
                });

            modelBuilder.Entity("ProjekatApi.Model.Car", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AirConditioning")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("AverageRating")
                        .HasColumnType("real");

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

                    b.Property<string>("AdministratorId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<float>("AverageRating")
                        .HasColumnType("real");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("AdministratorId");

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

            modelBuilder.Entity("ProjekatApi.Model.DiscountCar", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<float>("Cena")
                        .HasColumnType("real");

                    b.Property<DateTime>("EndDay")
                        .HasColumnType("datetime2");

                    b.Property<int>("NovaCena")
                        .HasColumnType("int");

                    b.Property<int>("Procenat")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDay")
                        .HasColumnType("datetime2");

                    b.Property<string>("carId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("DiscountCars");
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

                    b.Property<float>("AverageRating")
                        .HasColumnType("real");

                    b.Property<string>("Departure")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Length")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfConnections")
                        .HasColumnType("int");

                    b.Property<DateTime>("TakeOff")
                        .HasColumnType("datetime2");

                    b.Property<int>("Tip")
                        .HasColumnType("int");

                    b.Property<DateTime>("TouchDown")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("AircompanyId");

                    b.ToTable("Flights");

                    b.HasCheckConstraint("CK_Flights_Tip_Enum_Constraint", "[Tip] IN(0, 1)");
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

            modelBuilder.Entity("ProjekatApi.Model.FlightLuggage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("CarryOnPrice")
                        .HasColumnType("float");

                    b.Property<double>("DuffelPrice")
                        .HasColumnType("float");

                    b.Property<int>("IdCompany")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Luggages");
                });

            modelBuilder.Entity("ProjekatApi.Model.FlightQuickReservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Arrival")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Class")
                        .HasColumnType("int");

                    b.Property<string>("Departure")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Discount")
                        .HasColumnType("float");

                    b.Property<int>("FlightId")
                        .HasColumnType("int");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<bool>("Reserved")
                        .HasColumnType("bit");

                    b.Property<int>("SeatNo")
                        .HasColumnType("int");

                    b.Property<DateTime>("TakeOff")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("FlightQuickReservations");

                    b.HasCheckConstraint("CK_FlightQuickReservations_Class_Enum_Constraint", "[Class] IN(0, 1, 2)");
                });

            modelBuilder.Entity("ProjekatApi.Model.FlightReservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Accepted")
                        .HasColumnType("bit");

                    b.Property<int>("FlightId")
                        .HasColumnType("int");

                    b.Property<int>("SeatId")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("FlightReservations");
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

            modelBuilder.Entity("ProjekatApi.Model.FriendRequest", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Accepted")
                        .HasColumnType("bit");

                    b.Property<string>("ReceiverID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderCity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderFirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderLastName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("FriendRequests");
                });

            modelBuilder.Entity("ProjekatApi.Model.Rating", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Descriminator")
                        .HasColumnType("int");

                    b.Property<string>("IdService")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Mark")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Rating");

                    b.HasCheckConstraint("CK_Rating_Descriminator_Enum_Constraint", "[Descriminator] IN(0, 1, 2)");
                });

            modelBuilder.Entity("ProjekatApi.Model.ReservationCar", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("City1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Day1")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Day2")
                        .HasColumnType("datetime2");

                    b.Property<string>("IdCar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdCompany")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdDiscountCar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdUser")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.ToTable("ReservationCar");
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

            modelBuilder.Entity("ProjekatApi.Model.BranchOffices", b =>
                {
                    b.HasOne("ProjekatApi.Model.CarCompany", "Id_company")
                        .WithMany("BranchOffices")
                        .HasForeignKey("Id_companyId");
                });

            modelBuilder.Entity("ProjekatApi.Model.Car", b =>
                {
                    b.HasOne("ProjekatApi.Model.CarCompany", "CarCompany")
                        .WithMany("Cars")
                        .HasForeignKey("CarCompanyId");
                });

            modelBuilder.Entity("ProjekatApi.Model.Company", b =>
                {
                    b.HasOne("ProjekatApi.Model.ApplicationUser", "Administrator")
                        .WithMany()
                        .HasForeignKey("AdministratorId");
                });

            modelBuilder.Entity("ProjekatApi.Model.Destination", b =>
                {
                    b.HasOne("ProjekatApi.Model.Aircompany", "Aircompany")
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
