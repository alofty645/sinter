import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

import {
  CirclePlusIcon,
  FileIcon,
  ListFilterIcon,
  MoveHorizontalIcon,
} from "@/components/icons/icons";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { createClient } from "@/utils/supabase/server";
import { Select } from "@/components/ui/select";

import {
  deleteProduct,
  editProduct,
  addProduct,
  fetchProducts,
} from "@/utils/queries/productqueries";
import { Dialog } from "@/components/ui/dialog";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default async function Homepage() {
  const products = await fetchProducts();

  return (
    <div className="bg-muted/40 flex min-h-screen w-full flex-col">
      <div className="flex flex-col ">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger className="hidden sm:flex" value="archived">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-8 gap-1" size="sm" variant="outline">
                      <ListFilterIcon className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button className="h-8 gap-1" size="sm" variant="outline">
                  <FileIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="h-8 gap-1" size="sm">
                      <CirclePlusIcon className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Product
                      </span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <form action={addProduct}>
                      <SheetHeader>
                        <SheetTitle>Add a product</SheetTitle>
                        <SheetDescription></SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input name="name" id="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Status
                          </Label>
                          <Select name="status">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue defaultValue="Active" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Draft">Draft</SelectItem>
                              <SelectItem value="Archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Price
                          </Label>
                          <Input name="price" className="col-span-3" />
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit">add</Button>
                        </SheetClose>
                      </SheetFooter>
                    </form>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          In stock
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Price
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products!.map((product) => (
                        <TableRow key={product.product_id}>
                          <TableCell className="font-medium">
                            {product.product_id}
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.status}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.in_stock}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            ${product.price}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoveHorizontalIcon className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                <Sheet>
                                  <SheetTrigger asChild className="mx-2">
                                    <Button>Edit</Button>
                                  </SheetTrigger>
                                  <SheetContent>
                                    <form action={editProduct}>
                                      <input
                                        type="hidden"
                                        name="product_id"
                                        value={product.product_id}
                                      />
                                      <SheetHeader>
                                        <SheetTitle>Edit product</SheetTitle>
                                        <SheetDescription></SheetDescription>
                                      </SheetHeader>
                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="name"
                                            className="text-right"
                                          >
                                            Name
                                          </Label>
                                          <Input
                                            name="name"
                                            id="name"
                                            className="col-span-3"
                                            defaultValue={product.name}
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="status"
                                            className="text-right"
                                          >
                                            Status
                                          </Label>
                                          <Select name="status">
                                            <SelectTrigger className="w-[180px]">
                                              <SelectValue
                                                defaultValue={product.status}
                                              />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="Active">
                                                Active
                                              </SelectItem>
                                              <SelectItem value="Draft">
                                                Draft
                                              </SelectItem>
                                              <SelectItem value="Archived">
                                                Archived
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="price"
                                            className="text-right"
                                          >
                                            Price
                                          </Label>
                                          <Input
                                            name="price"
                                            className="col-span-3"
                                            defaultValue={product.price}
                                          />
                                        </div>
                                      </div>
                                      <SheetFooter>
                                        <SheetClose asChild>
                                          <Button type="submit">update</Button>
                                        </SheetClose>
                                      </SheetFooter>
                                    </form>
                                  </SheetContent>
                                </Sheet>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button>Delete</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Delete product</DialogTitle>
                                      <DialogDescription>
                                        Are you sure you want to delete this
                                        product?
                                      </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <form action={deleteProduct}>
                                          <input
                                            type="hidden"
                                            name="product_id"
                                            value={product.product_id}
                                          />

                                          <Button type="submit">Delete</Button>
                                        </form>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
