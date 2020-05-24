using Microsoft.EntityFrameworkCore;
using ProjekatApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi
{
    public class DatabaseContext: DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FlightDestination>().HasKey(fd => new { fd.DestinationId, fd.FlightId });

            modelBuilder.Entity<FlightDestination>()
                .HasOne<Flight>(fd => fd.Flight)
                .WithMany(f => f.FlightDestinations)
                .HasForeignKey(fd => fd.FlightId);

            modelBuilder.Entity<FlightDestination>()
                .HasOne<Destination>(fd => fd.Destination)
                .WithMany(d => d.FlightDestinations)
                .HasForeignKey(fd => fd.DestinationId);

            modelBuilder.Entity<Destination>().HasIndex(d => d.City).IsUnique();
            modelBuilder.Entity<Company>().HasIndex(c => c.Name).IsUnique();
        }



        public DbSet<Destination> Destinations { get; set; }
        public DbSet<FlightSeat> FlightSeats { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<FlightDestination> FlightDestinations { get; set; }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Aircompany> Aircompanies { get; set; }

        public DbSet<CarCompany> Carcompanies { get; set; }

        public DbSet<Car> Cars { get; set; }

        public DbSet<BranchOffices> BranchOffices { get; set; }

    }
}
