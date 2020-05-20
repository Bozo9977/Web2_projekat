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

        public DbSet<Destination> Destinations { get; set; }

        public DbSet<FlightSeat> FlightSeats { get; set; }

        public DbSet<Flight> Flights { get; set; }
    }
}
