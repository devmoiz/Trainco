﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TPCTrainco.Umbraco.Extensions
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class americantraincoEntities : DbContext
    {
        public americantraincoEntities()
            : base("name=americantraincoEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<cart> carts { get; set; }
        public virtual DbSet<cartLine> cartLines { get; set; }
        public virtual DbSet<CATEGORY> CATEGORies { get; set; }
        public virtual DbSet<CATEGORYTYPE> CATEGORYTYPEs { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<CourseFormat> CourseFormats { get; set; }
        public virtual DbSet<CourseInstructor> CourseInstructors { get; set; }
        public virtual DbSet<COURS> COURSES { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<LocationType> LocationTypes { get; set; }
        public virtual DbSet<REGISTRATION> REGISTRATIONS { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<temp_Att> temp_Att { get; set; }
        public virtual DbSet<temp_Cust> temp_Cust { get; set; }
        public virtual DbSet<temp_Errors> temp_Errors { get; set; }
        public virtual DbSet<temp_Reg> temp_Reg { get; set; }
        public virtual DbSet<WebSignup> WebSignups { get; set; }
        public virtual DbSet<CourseTopic> CourseTopics { get; set; }
        public virtual DbSet<CourseType> CourseTypes { get; set; }
        public virtual DbSet<CC_Log> CC_Log { get; set; }
        public virtual DbSet<SCHEDULE> SCHEDULES { get; set; }
        public virtual DbSet<ScheduleCourseInstructor> ScheduleCourseInstructors { get; set; }
        public virtual DbSet<Seminar_Catalog> Seminar_Catalog { get; set; }
    
        public virtual int add_CC_Log(Nullable<int> p1, Nullable<int> p2, string p3, string p4, Nullable<decimal> p5, string p6, string p7)
        {
            var p1Parameter = p1.HasValue ?
                new ObjectParameter("P1", p1) :
                new ObjectParameter("P1", typeof(int));
    
            var p2Parameter = p2.HasValue ?
                new ObjectParameter("P2", p2) :
                new ObjectParameter("P2", typeof(int));
    
            var p3Parameter = p3 != null ?
                new ObjectParameter("P3", p3) :
                new ObjectParameter("P3", typeof(string));
    
            var p4Parameter = p4 != null ?
                new ObjectParameter("P4", p4) :
                new ObjectParameter("P4", typeof(string));
    
            var p5Parameter = p5.HasValue ?
                new ObjectParameter("P5", p5) :
                new ObjectParameter("P5", typeof(decimal));
    
            var p6Parameter = p6 != null ?
                new ObjectParameter("P6", p6) :
                new ObjectParameter("P6", typeof(string));
    
            var p7Parameter = p7 != null ?
                new ObjectParameter("P7", p7) :
                new ObjectParameter("P7", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("add_CC_Log", p1Parameter, p2Parameter, p3Parameter, p4Parameter, p5Parameter, p6Parameter, p7Parameter);
        }
    
        public virtual ObjectResult<Nullable<int>> add_Registration(Nullable<int> cartID)
        {
            var cartIDParameter = cartID.HasValue ?
                new ObjectParameter("cartID", cartID) :
                new ObjectParameter("cartID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("add_Registration", cartIDParameter);
        }
    }
}