using Backend_Memoria.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend_Memoria.Data
{
    public class FullStackDbContext : DbContext
    {
        public FullStackDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AdminUser> AdminUsers { get; set; }
        public DbSet<Header> Headers { get; set; }
        public DbSet<About> Abouts { get; set; }
        public DbSet<AboutQuality> AboutQualities { get; set; }
        public DbSet<Services> Services { get; set; }
        public DbSet<Packages> Packages { get; set; }
        public DbSet<Carousel> Carousel { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<Prices> Prices { get; set; }
        public DbSet<PricesCharacteristics> PricesCharacteristics { get; set; }
        public DbSet<TitleSubtitle> TitleSubtitle { get; set; }
        public DbSet<Navv> Navv { get; set; }
        public DbSet<PackageService> PackageService { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurarea relației de one-to-many între About și AboutQuality
            modelBuilder.Entity<About>()
                .HasMany(a => a.AboutQualities)
                .WithOne(aq => aq.About)
                .HasForeignKey(aq => aq.AboutId);

            // Configurarea relației de many-to-one între Prices și TitleSubtitle
            modelBuilder.Entity<Prices>()
                .HasOne(p => p.TitleSubtitle)
                .WithMany()
                .HasForeignKey(p => p.TitleSubtitleId);

     
        }
        public DbSet<Backend_Memoria.Models.SocialMedia> SocialMedia { get; set; }
      
     
      
        
        
     
    }
}
